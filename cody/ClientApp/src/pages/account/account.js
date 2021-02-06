import React from 'react';
import { Box, Grid, Paper, Typography, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LoadingButton } from 'src/components/buttons/loading_button'
import { InfoBox } from './account_components/info_box';
import { DataForms } from './account_components/data_forms';
import { ErrorsController } from './errors_controller';

import { ProfilePicture } from 'src/lib/profile_picture'

import history from 'src/history'

const useStyles = makeStyles((theme) => ({
	box: {
		maxWidth: 450,
		width: "100%",
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
    },
	},
	mainPaper: {
		padding: theme.spacing(2),
	},
  title: {
    [theme.breakpoints.down('xs')]: {
      textAlign: "center",
    },
  }
}));

export function Account(){
	const classes = useStyles();
  const [loadingSave, setLoadingSave] = React.useState(false);
  const [edited, setEdited] = React.useState(false);

  const oldDataValues = {
    username: "Matteo2437",
    name: "Matteo",
    surname: "Budriesi",
    email: "matteo.budriesi@gmail.com",
    school: {
      id: 1,
      name: "ITIS Fermi",
      city: "Modena",
      country: "Italia"
    },
    birthDate: new Date("09/01/2000"),
  }
  const [oldData, setOldData] = React.useState(oldDataValues);
  const [data, setData] = React.useState(oldDataValues);
  const [image, setImage] = React.useState("profile_picture");

  const noErrors = {
		usernameError: false,
		usernameExist: false,

    nameError: false,
		surnameError: false,
		
		emailError: false,
		emailExist: false,

    birthDateError: false,
  }
  const [errors, setErrors] = React.useState(noErrors);
  
  const getImage = (value) => {
    if(value !== "profile_picture"){
      setImage(value);
      setEdited(true);
    }
  }
  
  const getData = (data) => {
    if(JSON.stringify(data) === JSON.stringify(oldData)){
      setEdited(false)
    }
    else{
      setData(data);
      setEdited(true);
    }
  }

  const handleTrySave = () => {
    const errorsController = new ErrorsController;
    
    setLoadingSave(true);
    setErrors(noErrors);

    errorsController
      .checkAll(data, oldDataValues)
      .then(results => {
        let errors = {};
        results.forEach(result => {
          if (result === 'noError') {
            if(image !== "profile_picture" && image !== null){
              ProfilePicture
                .createOrUpdate({
                  base64: image,
                })
                .then(() => {
                  setEdited(false);
                  setLoadingSave(false);
                  history.go(0);
                });
            }
            else if(image === null){
              ProfilePicture
                .delete()
                .then(() => {
                  setEdited(false);
                  setLoadingSave(false);
                  history.go(0);
                })
            }
            else{
              history.go(0);  
              setEdited(false);
            }
            setOldData(data);
          }
          errors[result] = true;
        });
        
        setErrors(errors);
        setLoadingSave(false);
      })
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
				<Typography 
          color="textSecondary" 
          variant="h5" 
          className={classes.title}
        >
          Il tuo Account
        </Typography>
				<Paper 
					className={classes.mainPaper}
				>
					<InfoBox
            username={oldData.username}
            school={oldData.school}
            onImageChange={getImage}
          />
          <DataForms
            data={data}
            oldData={oldData}
            onDataChange={getData}
            errors={errors}
          />
          <Box 
            pt={1}
            textAlign="end"
          > 
            <LoadingButton
              disabled={!edited}
              onClick={handleTrySave}
              loading={loadingSave}
              label="Salva"
            />
          </Box>
				</Paper>
			</div>
		</Grid>
	);
}

