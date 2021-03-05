
import React from 'react';

import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { AddPhoto } from 'src/components/pickers/add_photo';
import { SchoolPicker } from 'src/components/pickers/school_picker';

import { NextFocus } from 'src/lib/next_focus';

import { Step3 } from 'src/components/illustrations/step3';

export const useStyles = makeStyles((theme) => ({
  addPhoto: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  addPhotoLabel: {
    marginTop: theme.spacing(2)
  },
  schoolPickerLabel: {
    marginBottom: theme.spacing(1)
  }
}));

export function OptionalData(props){
	const classes = useStyles();
  const nextFocus = new NextFocus(["school"]);

  return (
    <BasePhotoText
      image={Step3}
      margin={1}
      bottomMargin={2}
      items={[
        <Grid
          className={classes.addPhoto}
          container
          justify="center"
        >
          <AddPhoto
            image={image => props.onProfileImageChange(image)}
            disableLoading
          />
          <Typography
            className={classes.addPhotoLabel}
            variant="subtitle2"
          >
            Aggiungi un'immagine profilo
          </Typography>
        </Grid>,
        <>
          <Grid
            className={classes.schoolPickerLabel}
            container
            direction="row"              
          >
            <Typography
              variant="body2"
              color="secondary"
            >
              Sei uno studente?
            </Typography>
          </Grid>
          <SchoolPicker
            variant="outlined"
            imageWidth = {props.imageWidth} 
            formWidth={props.formWidth}
            values={props.values}
            school={props.onSchoolChange}
            isAddedSchool={props.onIsAddedSchoolChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                nextFocus.removeFocus();
              }
            }}
          />
        </>,
      ]}
    />
  );
}
