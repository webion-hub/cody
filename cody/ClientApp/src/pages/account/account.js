import React from 'react';
import { Box, Grid, Paper, Typography, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LoadingButton } from 'src/components/buttons/loading_button'
import { InfoBox } from './account_components/info_box';
import { DataForms } from './account_components/data_forms';
import { ErrorsController } from './errors_controller';

import { ProfilePicture } from 'src/lib/profile_picture'

const useStyles = makeStyles((theme) => ({
	box: {
		maxWidth: 450,
		width: "100%"
	},
	mainPaper: {
		padding: theme.spacing(2),
	},
}));

export function Account(){
	const classes = useStyles();
  const [image, setImage] = React.useState("profile_picture");
  const [aValueIsEdited, setAValueIsEdited] = React.useState(false);
  const [loadingSave, setLoadingSave] = React.useState(false);

  const oldDataValues = {
    username: "Matteo2437",
    name: "Matteo",
    surname: "Budriesi",
    email: "matteo.budriesi@gmail.com",
    school: "ITIS Fermi",
    birthDate: "01/09/00",
  }
  const [oldData, setOldData] = React.useState(oldDataValues);
  const [data, setData] = React.useState(oldDataValues);

  const noErrors = {
		usernameError: false,
		usernameExist: false,

    nameError: false,
		surnameError: false,
		
		emailError: false,
		emailExist: false,
  }
  const [errors, setErrors] = React.useState(noErrors);
  

  const getImage = (value) => {
    if(value !== "profile_picture"){
      setImage(value);
      setAValueIsEdited(aValueIsEdited || value);
    }
  }
  
  const getData = (data) => {
    setData(data);
  }

  const handleAValueIsEdited = (value) => {
    setAValueIsEdited(aValueIsEdited || value);
  }
  const resetAValueIsEdited = () => {
    setAValueIsEdited(false);
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
            if(image !== "profile_picture"){
              ProfilePicture
                .createOrUpdate(image)
                .then(() => {
                  setAValueIsEdited(false);
                  setLoadingSave(false);
                })
            }
            setOldData(data);
            setAValueIsEdited(false);
          }
          errors[result] = true;
        })
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
				<Typography color="textSecondary" variant="h5">Il tuo Account</Typography>
				<Paper 
					className={classes.mainPaper}
				>
					<InfoBox
            username={data.username}
            school={data.school}
            onImageChange={getImage}
          />
          <DataForms
            data={data}
            oldData={oldData}
            handleAValueIsEdited={handleAValueIsEdited}
            resetAValueIsEdited={resetAValueIsEdited}
            onDataChange={getData}
            errors={errors}
          />
          <Box 
            pt={2}
            textAlign="end"
          > 
            <LoadingButton
              disabled={!aValueIsEdited}
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

