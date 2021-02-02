import React from 'react';
import { Box, Grid, IconButton, Paper, TextField, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AddPhoto } from 'src/components/pickers/add_photo'
import { DialogBase } from 'src/components/bases/dialog_base'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import { ProfilePicture } from 'src/lib/profile_picture'

const useStyles = makeStyles((theme) => ({
	box: {
		maxWidth: 450,
		width: "100%"
	},
	mainPaper: {
		padding: theme.spacing(4),
	},
	editBox: {
		marginTop: theme.spacing(4),
		paddingLeft: theme.spacing(2),
		padding: theme.spacing(1),
    background: theme.palette.background.paperSecondary
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
	
  const getImage = (value) => {
		setImage(value);
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
					<Paper className={classes.editBox}>
						<UserData title="Username" value="Matteo2437"/>
						<UserData title="Nome" value="Matteo"/>
						<UserData title="Cognome" value="Budriesi"/>
						<UserData title="Email" value="matteo.budriesi@gmail.com" alternative/>
						<UserData title="Istituto" value="ITIS Fermi"/>
						<UserData title="Data di nascita" value="01/09/00" last alternative/>
					</Paper>
				</Paper>
			</div>
		</Grid>
	);
}

function UserData(props){
	const classes = useStyles();
  const [edit, setEdit] = React.useState(false);

	const handleClick = () => {
		setEdit(true);
	}

	const handleClose = () => {
		setEdit(false);
	}

	return (
		<Box mb={props.last ? 0 : 1}>
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
			>
				<div>
					<Typography variant="body2" color="secondary">{props.title}</Typography>
					<Typography variant="body1" color="textSecondary" className={classes.truncateTypography}>{props.value}</Typography>
				</div>
				<IconButton 
					color="secondary"
					onClick={handleClick}
				>
					<EditRoundedIcon/>
				</IconButton>
			</Grid>
			<DialogBase
				open={edit}
				onClose={handleClose}
				title={`Cambia ${props.alternative ? "la tua" : "il tuo"} ${props.title}`}
				firstButton={
					<Button
						onClick={handleClose}
						color="secondary"
					>
						Chiudi
					</Button>
				}
				secondButton={
					<Button
						onClick={handleClose}
						variant="contained"
						color="primary"
					>
						Conferma
					</Button>
				}
			>
				<TextField
					fullWidth
					label={props.title} 
					variant="outlined"
				/>
			</DialogBase>
		</Box>
	);
}