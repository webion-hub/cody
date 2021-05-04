
import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper';

import { BasePhotoText } from 'src/components/bases/base_photo_text'

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { AvatarAddPhoto } from 'src/components/pickers/others/avatar_add_photo';
import { Step3 } from 'src/components/illustrations/illustrations/illustrations';

const useStyles = makeStyles((theme) => ({
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

export default function AddPhotoStep(props){
	const classes = useStyles();
  const [acceptTerms, setAcceptTerms] = React.useState(false)

  const handleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms)
    props.onAcceptTerms(!acceptTerms)
  }

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
          <AvatarAddPhoto
            disableLoading
            onImageChange={props.onProfileImageChange}
            alt={props.values.username}
            src={props.values.profileImage}
          />
          <Typography
            className={classes.addPhotoLabel}
            variant="subtitle2"
          >
            Aggiungi un'immagine profilo
          </Typography>
        </Grid>,
        <Paper>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="row"
          >
            <FormControlLabel
              value="end"
              required
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  onChange={handleAcceptTerms}
                />
              }
              label={
                <Typography
                  variant="caption"
                  color={props.errors.acceptTermsError ? "error" : "textSecondary"}
                >
                  Accetto i termini di servizio
                </Typography>
              }
              labelPlacement="end"
            />
            <IconButton>
              <ArrowForwardRoundedIcon/>
            </IconButton>
          </Grid>
        </Paper>
      ]}
    />
  );
}
