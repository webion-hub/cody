import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { DialogBase } from 'src/components/bases/dialog_base';
import { CustomStepper } from 'src/components/stepper/custom_stepper/custom_stepper';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';
import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { SignUpAlertError } from './components/sign_up_alert_error';

import { dataDefault, noErrors } from './default_values/default_values';

import { SignUpCompleted } from './steps/form_completed/sign_up_completed';
import { getElements } from './steps/getElements';

import { Images } from 'src/lib/default_values/images/images';
import { tryRegister } from './lib/try_register';
import { PageController } from 'src/lib/page_controller';


const useStyles = makeStyles((theme) => ({
  formCompletedButton: {
    marginTop: theme.spacing(2),
  },
  formCompletedDialog: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(8)}px !important`
    },
  },
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

export default function SignUp(){
	const classes = useStyles();
  const [data, setData] = React.useState(dataDefault); 

  const [errors, setErrors] = React.useState(noErrors);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [registrationErrors, setRegistrationErrors] = React.useState({
    registerError: null,
    missingFields: null,
    imageUploadError: null,
  });

  const [openAlert, setOpenAlert] = React.useState(false);
  const { setUserState } = React.useContext(UserContext);

  const handleDataChange = (prop) => (value) => {
    setData({
      ...data,
      [prop]: value
    });
  }

  const tryRegisterPrep = async (data) => {
    await tryRegister({
      data: data,
      profileImage: data.profileImage,
      registrationErrors: registrationErrors,
      onError: (errors) => setRegistrationErrors(errors),
      setOpenAlert: (open) => setOpenAlert(open),
    })
    .then(setOpenDialog)
  }

  const elementsList = getElements({
    handleDataChange: handleDataChange,
    data: data,
    errors: errors
  })

  const onFormCompleted = () => {
    setOpenDialog(false)
    setUserState("logged")
  }

  return (
    <>
      <CenterComponentPageBase
        className={classes.pageContainer}
        direction="column"
      >     
        <CustomStepper
          hrefFirstPage='/login'
          onBackFirstPage={(e) => PageController.push('/login', e)}
          firstPageLabel="Vai al login"
          data={data}
          setErrors={setErrors}
          elements={elementsList}
          onFormCompleted={tryRegisterPrep}
        />   
        <SignUpAlertError
          open={openAlert}
          registrationErrors={registrationErrors}
        />
      </CenterComponentPageBase>
      <SignUpCompleted
        open={openDialog}
        onFormCompleted={onFormCompleted}
      />
    </>
  );
}