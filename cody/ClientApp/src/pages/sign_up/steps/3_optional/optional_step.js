
import React from 'react';

import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { AddPhoto } from 'src/components/pickers/others/add_photo';

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
            onImageChange={image => props.onProfileImageChange(image)}
            alt={props.values.username}
            value={props.values.profileImage}
            disableLoading
          />
          <Typography
            className={classes.addPhotoLabel}
            variant="subtitle2"
          >
            Aggiungi un'immagine profilo
          </Typography>
        </Grid>
      ]}
    />
  );
}
