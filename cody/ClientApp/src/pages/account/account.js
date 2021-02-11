import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';

import { LoadingButton } from 'src/components/buttons/loading_button'
import { InfoBox } from './account_components/info_box';
import { DataForms } from './account_components/data_forms';
import { ErrorsController } from './errors_controller';
import { accountStyles } from './account_styles';
import { nullData, noErrors } from './default_states';

import { ProfilePicture } from 'src/lib/profile_picture'
import { UserAccountInfo } from 'src/lib/user_account_info'
import { AlertDialog } from 'src/components/dialogs/alert_dialog';

import history from 'src/history'

export function Account(){
	const classes = accountStyles();

  //Loadings
  const [loadingSave, setLoadingSave] = React.useState(false);
  const [loadingLoad, setLoadingLoad] = React.useState(true);

  //A value has been edited
  const [edited, setEdited] = React.useState(false);
  const [editedImage, setEditedImage] = React.useState(false);

  //Data & image
  const [oldData, setOldData] = React.useState(nullData);
  const [data, setData] = React.useState(nullData);
  const [image, setImage] = React.useState("profile_picture");

  //Errors
  const [errors, setErrors] = React.useState(noErrors);
  const [duringSavingErrors, setDuringSavingErrors] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  
  //Data init
  useEffect(() => {
    UserAccountInfo
      .createRequest()
        .get('username')
        .get('name')
        .get('surname')
        .get('email')
        .get('birthDate')
        .get('school')
      .send()
      .then(resp => {
        const got = resp.got;
        const actualData = {
          username: got.get('username'),
          name: got.get('name'),
          surname: got.get('surname'),
          email: got.get('email'),
          birthDate: new Date(got.get('birthDate')),
          school: got.get('school'),
        }

        setData(actualData);        
        setOldData(actualData);
        setLoadingLoad(false);
      })
  }, [])


  /**
   * Get values
   */

  const getImage = (value) => {
    if(value !== "profile_picture"){
      setImage(value);
      setEditedImage(true);
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


  /**
   * Try save
   */

  const refresh = () => {
    setLoadingSave(false)
    history.go(0)
  }

  const updateProfilePic  = () => {
    ProfilePicture
      .createOrUpdate({
        base64: image,
      })
      .then(() => refresh());
  }

  const deleteProfilePic  = () => {
    ProfilePicture
      .delete()
      .then(() => refresh())
  }

  const handleTrySave = () => {
    const errorsController = new ErrorsController;
    
    setLoadingSave(true);
    setErrors(noErrors);
    setOpenAlert(false);

    errorsController
      .checkAll(data, oldData)
      .then(results => {
        let errors = {};
        results.forEach(result => {
          errors[result] = true;
        });
        
        if(errors.noError){
          UserAccountInfo
            .createRequest()
              .set('username', data.username)
              .set('name', data.name)
              .set('surname', data.surname)
              .set('email', data.email)
              .set('birthDate', data.birthDate)
              .set('school', data.school? data.school.id : null)
            .send()
            .then(res => {
              if(res.set.length != 0){
                //Are errors during saving
                setLoadingSave(false);
                setOpenAlert(true)
                setDuringSavingErrors(res.set)
              }
              else {
                //No errors during saving
                if(image !== "profile_picture" && image !== null)
                  updateProfilePic()
                else if(image === null)
                  deleteProfilePic()
                else
                  refresh()
              }
            })           
        }
        else
        {
          //Are errors
          setErrors(errors);
          setLoadingSave(false);
        }
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
            loading={loadingLoad}
            username={oldData.username}
            school={oldData.school}
            onImageChange={getImage}
          />
          <DataForms
            loading={loadingLoad}
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
              disabled={!(edited || editedImage)}
              onClick={handleTrySave}
              loading={loadingSave}
              label="Salva"
            />
          </Box>
				</Paper>
			</div>
      <AlertDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        items={[
          <Grid
            container
            direction="column"
          >
            {
              Array.isArray(duringSavingErrors)?
                duringSavingErrors.map((err, i) => 
                  <div key={i}>{err}</div>
                )
                :
                null
            }
          </Grid>,
        ]}
      />
		</Grid>
	);
}