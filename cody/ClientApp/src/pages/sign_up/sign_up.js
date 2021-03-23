import React from 'react';

import { Grid } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CustomStepper } from 'src/components/stepper/custom_stepper/custom_stepper';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';
import { UserContext } from 'src/components/user_controller_context';
import { SignUpAlertError } from './components/sign_up_alert_error';

import { dataDefault, noErrors } from './default_values/default_values';

import { SignUpCompleted } from './steps/form_completed/sign_up_completed';
import { getElements } from './steps/getElements';

import { Images } from 'src/lib/default_values/images/images';
import { PageController } from 'src/lib/page_controller';
import { tryRegister } from './lib/try_register';

export const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundImage: `url(${Images.forestImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  termsAndService: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 13,
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
  const { setIsLoggedWithoutRefresh } = React.useContext(UserContext);

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

  const tryRegisterPrep = () => {
    return tryRegister({
      data: setUser(data),
      profileImage: data.profileImage,
      registrationErrors: registrationErrors,
      onSuccess: () => setIsLoggedWithoutRefresh(true),
      onError: (errors) => setRegistrationErrors(errors),
      onOpenAlert: (open) => setOpenAlert(open),
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
      <CustomStepper
        data={data}
        setErrors={setErrors}
        elements={elementsList}
        formCompleted={<SignUpCompleted/>}
        onFormCompleted={tryRegisterPrep}
      />   
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
      <SignUpAlertError
        open={openAlert}
        registrationErrors={registrationErrors}
      />
    </CenterComponentPageBase>
  );
}