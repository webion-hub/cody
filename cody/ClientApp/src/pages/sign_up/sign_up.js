import React from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SignUpCompleted } from './sign_up_steps/sign_up_completed';
import { CustomStepper } from 'src/components/stepper/custom_stepper';
import { getElements } from './sign_up_components/getElements';
import { dataDefault, noErrors } from './sign_up_components/default_values';

import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';
import { UserContext } from 'src/components/user_controller_context';
import { AlertDialog } from 'src/components/dialogs/alert_dialog';

import { User } from 'src/lib/user';
import { ProfilePicture } from 'src/lib/profile_picture';
import { Images } from 'src/lib/default_values/images';
import { PageController } from 'src/lib/page_controller';

export const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: "100vh",
    backgroundImage: `url(${Images.forestImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  paper: {
    background: theme.palette.background.paperSecondary,
    backgroundImage: theme.palette.type === "dark" ? "url(images/waves/wavesDark.svg)" : "url(images/waves/wavesLight.svg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    padding: theme.spacing(2),
    maxWidth: 632,
    width: "100%",
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight + theme.spacing(4),
    },
  },
  termsAndService: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8),
    },
  },
  termsAndServiceTypography: {
    marginRight: 5,
    color: "#d0d0d0"
  },
  termsAndServiceLink: {
    fontWeight: "bold",
    color: "#d0d0d0"
  }
}));

export function SignUp(){
	const classes = useStyles();
  const [data, setData] = React.useState(dataDefault); 

  const [errors, setErrors] = React.useState(noErrors);
  const [registrationErrors, setRegistrationErrors] = React.useState({
    registerError: null,
    missingFields: null,
    imageUploadError: null,
  });

  const [openAlert, setOpenAlert] = React.useState(false);
  const { setLoggedWithoutRefresh } = React.useContext(UserContext);

  const handleDataChange = (prop) => (value) => {
    setData({
      ...data,
      [prop]: value
    });
  }

  const setUser = (data) => {
    return {
      username: data.username,
      password: data.password,
      email: data.email,
      accountDetail: {
        name: data.name,
        surname: data.surname,
        birthDate: data.birthDate,
      }
    } 
  }

  const tryRegister = () => {
    setRegistrationErrors({
      registerError: null,
      missingFields: null,
      imageUploadError: null,  
    })

    return new Promise(resolve => {
      User.tryRegister({
        user: setUser(data),
  
        onSuccess: _ => {
          setLoggedWithoutRefresh(true)
          if (data.profileImage == null){            
            resolve(true)
          }
          else{
            ProfilePicture
              .createOrUpdate({
                base64: data.profileImage,
              })
              .then(_ => resolve(true))
              .catch(_ => {
                setOpenAlert(true)
                setRegistrationErrors({
                  ...registrationErrors,
                  imageUploadError: "Prova a ricaricare l'immagine più tardi."
                })
                resolve(false)
              });
          }
        },
        onError: reasons => {
          setOpenAlert(true)  
          setRegistrationErrors({
            ...registrationErrors,
            registerErrors: reasons
          })
          resolve(false)
        },
        onMissingFields: reasons => {
          setOpenAlert(true)  
          setRegistrationErrors({
            ...registrationErrors,
            missingFields: "Manca data di nascita"
          })
          resolve(false)
        },
      })
    })
  }

  const elementsList = getElements({
    handleDataChange: handleDataChange,
    data: data,
    errors: errors
  })

  return (
    <CenterComponentPageBase
      className={classes.pageContainer}
      direction="column"
    >        
      <Paper className={classes.paper}>
        <CustomStepper
          data={data}
          setErrors={setErrors}
          elements={elementsList}
          formCompleted={<SignUpCompleted/>}
          onFormCompleted={tryRegister}
        />
      </Paper>
      <div className={classes.termsAndService}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignContent="flex-start"
        >
          <Typography
            className={classes.termsAndServiceTypography}
            variant="caption"
          >
            Registrandoti accetti i nostri
          </Typography>
          <Link
            className={classes.termsAndServiceLink}
            component="button"
            variant="caption"
            href="/terms_and_services"
            onClick={(e) => PageController.push('/terms_and_services', e)}
          >
            termini di servizio.
          </Link>
        </Grid>
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
              registrationErrors.registerError ? 
                [
                  registrationErrors
                    .registerErrors.map(e => ({
                      username: <Typography variant="body2">errore inserimento username</Typography>,
                      name: <Typography variant="body2">errore inserimento nome</Typography>, 
                      surname: <Typography variant="body2">errore inserimento cognome</Typography>, 
                      email: <Typography variant="body2">errore inserimento email</Typography>,
                      password: <Typography variant="body2">errore inserimento password</Typography>,
                      birthDate: <Typography variant="body2">errore inserimento data nascita</Typography>,
                    }[e]))
                ]
                :
                null
            }
          </Grid>,
          <Typography variant="body2">
            {registrationErrors.missingFields}
          </Typography>,
          <Typography variant="body2">
            {registrationErrors.imageUploadError}
          </Typography>,
        ]}
      />
    </CenterComponentPageBase>
  );
}