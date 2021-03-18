import React, { useEffect } from 'react';
import { Box, Grid, Paper } from '@material-ui/core';

import { LoadingButton } from 'src/components/buttons/loading_button'
import { InfoBox } from './components/info_box';
import { DataForms } from './components/data_forms';
import { AccountErrorsController } from './lib/account_errors_controller';
import { accountStyles } from './styles/account_styles';
import { nullData, noErrors } from './default_values/default_states';

import { ProfilePicture } from 'src/lib/profile_picture'
import { UserAccountInfo } from 'src/lib/user_account_info'
import { AlertDialog } from 'src/components/dialogs/alert_dialog';
import { BackgroundWithLines } from 'src/components/background_with_lines';

import { PageController } from 'src/lib/page_controller';
import { profileImage } from 'src/lib/default_values/profile_constants/profile_image';

export function Account(){
	const classes = accountStyles();

  //Loadings
  const [loadingSave, setLoadingSave] = React.useState(false);
  const [loadingLoad, setLoadingLoad] = React.useState(true);

  //A value has been edited
  const [isEdited, setIsEdited] = React.useState(false);
  const [isEditedImage, setIsEditedImage] = React.useState(false);
  const accountIsEdited = isEdited || isEditedImage;

  //Data & image
  const defaultImage = profileImage;
  const [image, setImage] = React.useState(defaultImage);
  const [oldData, setOldData] = React.useState(nullData);
  const [data, setData] = React.useState(nullData);

  //Errors
  const [errors, setErrors] = React.useState(noErrors);
  const [errorsDuringSaving, setErrorsDuringSaving] = React.useState([]);
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
        .get('role')
        .get('biography')
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
          role: got.get('role'),
          biography: got.get('biography'),
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
    setImage(value);
    setIsEditedImage(true);
  }

  const getData = (data) => {
    const areDataChange = JSON.stringify(data) !== JSON.stringify(oldData)

    if(areDataChange){
      setData(data);
      setIsEdited(true);
    }
    else{
      setIsEdited(false)
    }
  }


  /**
   * Try save
   */

  const refreshPage = () => {
    setLoadingSave(false)
    PageController.refresh()
  }

  const updateProfilePic  = () => {
    ProfilePicture
      .createOrUpdate({
        base64: image,
      })
      .then(() => refreshPage());
  }

  const deleteProfilePic  = () => {
    ProfilePicture
      .delete()
      .then(() => refreshPage())
  }

  const handleTrySave = () => {
    const errorsController = new AccountErrorsController();

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
              .set('role', data.role)
              .set('biography', data.biography)
            .send()
            .then(res => {
              if(res.set.length !== 0){
                //Are errors during saving data
                setLoadingSave(false);
                setOpenAlert(true)
                setErrorsDuringSaving(res.set)
              }
              else {
                //No errors during saving data
                const isImageChanged = image !== defaultImage;
                const isImageDeleted = image === null;
                const isImageChangeButNotDeleted =  isImageChanged && !isImageDeleted;

                if(isImageChangeButNotDeleted)
                  updateProfilePic()
                else if(isImageDeleted)
                  deleteProfilePic()
                else
                  refreshPage()
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

  const errorsList = 
    <Grid
      container
      direction="column"
    >
      {
        Array.isArray(errorsDuringSaving)?
          errorsDuringSaving.map((err, i) => 
            <div key={i}>{err}</div>
          )
          : null
      }
    </Grid>

	return (
		<Grid
			className={classes.container}
			container
			justify="center"
			alignItems="center"
		>
      <Paper className={classes.box}>
        <Grid
          container
          direction="row"
          alignContent="center"
          justify="center"
          spacing={2}
        >
          <Grid item>
            <InfoBox
              loading={loadingLoad}
              onImageChange={getImage}
              data={data}
              oldData={oldData}
              onDataChange={getData}
              defaultImage={defaultImage}
            />
          </Grid>
          <Grid item>
            <DataForms
              loading={loadingLoad}
              data={data}
              oldData={oldData}
              onDataChange={getData}
              errors={errors}
            />
          </Grid>
        </Grid>
        <Box
          textAlign="end"
          className={classes.submitButton}
        > 
          <LoadingButton
            disabled={!accountIsEdited}
            onClick={handleTrySave}
            loading={loadingSave}
            label="Salva"
          />
        </Box>
      </Paper>
      <AlertDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        items={[errorsList]}
      />
      <BackgroundWithLines/>
		</Grid>
	);
}