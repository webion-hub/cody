import React, { useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';

import { LoadingButton } from 'src/components/buttons/loading_button'
import { InfoBox } from './components/info_box';
import { DataForms } from './components/data_forms';
import { useAccountStyles } from './styles/account_styles';
import { nullData, noErrors } from './default_values/default_states';

import { AlertDialog } from 'src/components/dialogs/alert_dialog/alert_dialog';
import { BackgroundWithLines } from 'src/components/others/background_with_lines/background_with_lines';

import { profileImage } from 'src/lib/default_values/profile_constants/profile_image';
import { PaperWithWaves } from 'src/components/bases/papers/paper_with_waves';

import { getUserAllData } from './lib/get_user_all_data';
import { trySave } from './lib/try_save';
import { CenterComponentPageBase } from 'src/components/bases/layouts/center_component_page_base';

export default function Account(){
	const classes = useAccountStyles();

  //Loading
  const [loading, setLoading] = React.useState("loadingLoad");

  //A value has been edited
  const [isEdited, setIsEdited] = React.useState(false);
  const [isEditedImage, setIsEditedImage] = React.useState(false);
  const accountIsEdited = isEdited || isEditedImage;

  //Data & image
  const oldImage = profileImage;
  const [image, setImage] = React.useState(oldImage);
  const [oldData, setOldData] = React.useState(nullData);
  const [data, setData] = React.useState(nullData);

  //Errors
  const [errors, setErrors] = React.useState(noErrors);
  const [errorsDuringSaving, setErrorsDuringSaving] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  
  //Data init
  useEffect(() => {
    getUserAllData()
      .then((data) => {
        setData(data);        
        setOldData(data);
        setLoading("noLoading");
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

  const handleTrySave = () => {
    setLoading("loadingSave");
    setErrors(noErrors);
    setOpenAlert(false);
    
    trySave({
      data: data,
      oldData: oldData,
      image: image,
      oldImage: oldImage,
      onError: (errors) => setErrors(errors),
      onSavingErrors: (errors) => {
        setOpenAlert(true)
        setErrorsDuringSaving(errors)
      }
    })
    .finally(() => setLoading("noLoading"))
  }

  const errorsList = 
    <Grid
      container
      direction="column"
    >
      {
        Array.isArray(errorsDuringSaving) &&
          errorsDuringSaving.map((err, i) => <div key={i}>{err}</div>)
      }
    </Grid>

	return (
    <CenterComponentPageBase>
      <PaperWithWaves className={classes.paperContainer}>
        <Grid
          container
          direction="row"
          alignContent="center"
          justify="center"
          spacing={2}
        >
          <Grid item>
            <InfoBox
              loading={loading === "loadingLoad"}
              onImageChange={getImage}
              data={data}
              oldData={oldData}
              onDataChange={getData}
              defaultImage={oldImage}
            />
          </Grid>
          <Grid item>
            <DataForms
              loading={loading === "loadingLoad"}
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
            loading={loading === "loadingSave"}
            label="Salva"
          />
        </Box>
      </PaperWithWaves>
      <AlertDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        items={[errorsList]}
      />
      <BackgroundWithLines/>
    </CenterComponentPageBase>
	);
}