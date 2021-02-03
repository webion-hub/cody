import React from 'react';
import { Box, Grid, IconButton, Paper, Typography, InputAdornment, Button, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import { AddPhoto } from 'src/components/pickers/add_photo'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

import { ProfilePicture } from 'src/lib/profile_picture'

const useStyles = makeStyles((theme) => ({
	box: {
		maxWidth: 450,
		width: "100%"
	},
	mainPaper: {
		padding: theme.spacing(2),
	},
	iconMargin: {
		marginRight: theme.spacing(1)
	},
	truncateTypography: {
		[theme.breakpoints.down('xs')]: {
			maxWidth: "50vw",
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
    },
	}
}));

export function Account(props){
	const classes = useStyles();
  const [image, setImage] = React.useState(null);
  const [aValueIsEdited, setAValueIsEdited] = React.useState(false);
  const [data, setData] = React.useState({
    username: "aaaa",
    name: "ffff",
    surname: "fffssfsf",
    email: "afasfasf",
    school: "sgfsdgd",
    birthDate: "aaaaa",
  });
	
  const getImage = (value) => {
		setImage(value);
  }
  
  const getValue = (dataName) => (value) => {
    setData({
      ...data,
      [dataName]: value,
    });
  }

  const handleAValueIsEdited = (value) => {
    setAValueIsEdited(aValueIsEdited || value);
  }

  const handleSave = () => {
    setAValueIsEdited(false);
  }
  
	return (
		<Grid
			style={{
				minHeight: "100vh"
			}}
			container
			justify="center"
			alignItems="center"
		>
			<div className={classes.box}>
				<Typography color="textSecondary" variant="h5">Il tuo Account</Typography>
				<Paper 
					className={classes.mainPaper}
				>
					<Grid
						container
						direction="row"
						alignItems="center"
					>
						<AddPhoto
							size={100}
							iconSize={40}
							image={getImage}
							value="profile_picture"
							accountEdit
						/>
						<Box pl={4}>

							<Grid
								container
								direction="row"
								alignItems="center"
							>
								<AccountCircleRoundedIcon className={classes.iconMargin}/>
								<Typography
									variant="h5"
								>
									Matteo2437
								</Typography>	
							</Grid>

							<Grid
								container
								direction="row"
								alignItems="center"
							>
								<SchoolRoundedIcon className={classes.iconMargin}/>
								<Typography
									variant="subtitle1"
								>
									ITIS Fermi Modena
								</Typography>	
							</Grid>
						</Box>
					</Grid>
					<Box mt={4}>
            <UserData 
              title="Username" 
              value={data.username} 
              getValue={getValue("username")}
              valueIsEdited={handleAValueIsEdited}
            />
            <UserData 
              title="Nome" 
              value={data.name} 
              getValue={getValue("name")}
              valueIsEdited={handleAValueIsEdited}
            />
            <UserData 
              title="Cognome" 
              value={data.surname} 
              getValue={getValue("surname")}
              valueIsEdited={handleAValueIsEdited}
            />
            <UserData 
              title="Email" 
              value={data.email} 
              getValue={getValue("email")}
              valueIsEdited={handleAValueIsEdited}
            />
            <UserData 
              title="Istituto" 
              value={data.school} 
              getValue={getValue("school")}
              valueIsEdited={handleAValueIsEdited}
            />
            <UserData 
              title="Data di nascita" 
              value={data.birthDate} 
              last 
              getValue={getValue("birthDate")}
              valueIsEdited={handleAValueIsEdited}
             />
					</Box>
          <Fade
            in={aValueIsEdited}
          >
            <Box 
              pt={2}
              textAlign="end"
            > 
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Salva
              </Button> 
            </Box>
          </Fade>
				</Paper>
			</div>
		</Grid>
	);
}

function UserData(props){
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState(props.value);

  const handleEdit = () => {
    setEdit(true);
  }
  const handleUndo = () => {
    setEdit(false);
    setValue(props.value);
  }
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleSubmit = () => {
	setEdit(false);
	
	if(value !== props.value){
		const {getValue} = props;
    getValue(value); 
    const {valueIsEdited} = props;
    valueIsEdited(true); 
    
    return;
  }
  const {valueIsEdited} = props;
  valueIsEdited(false); 
}

	return (
		<Box mb={props.last ? 0 : 1}>
      <TextField
        label={props.title}
        value={value}
        color="secondary"
        variant="filled"
        fullWidth
        onChange={handleChange}
        InputProps={{
          readOnly: !edit,
          endAdornment: (
            <InputAdornment position="end">
              {
                edit ? 
                  <IconButton
                    onClick={handleUndo}                    
                  >
                    <UndoRoundedIcon /> 
                  </IconButton>
                :
                  null
              }
              <IconButton
                onClick={edit ? handleSubmit : handleEdit}
              >
                {edit ? <CheckRoundedIcon/> : <EditRoundedIcon />}                  
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
		</Box>
	);
}