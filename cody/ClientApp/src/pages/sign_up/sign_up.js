import React from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SignUpCompleted } from './sign_up_steps/sign_up_completed';
import { SignUpStepper } from './sign_up_components/signup_stepper';
import { getElements } from './sign_up_components/getElements';
import { dataDefault, noErrors } from './sign_up_components/default_values';

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

  const [stepInfo, setStepInfo] = React.useState({
    currentStep: 0,
    newStep: 0,
  });

  const [loading, setLoading] = React.useState(false);  
  const [data, setData] = React.useState(dataDefault); 

  const [errors, setErrors] = React.useState(noErrors);  

  const handleDataChange = (prop) => (value) => {
    setData({
      ...data,
      [prop]: value
    });
  }

  const setUser = () => {
    return {
      username: data.username,
      password: data.password,
      email: data.email,
      accountDetail: {
        name: data.name,
        surname: data.surname,
        birthDate: data.birthDate,
        schoolId: data.school ? data.school.id : null,
      }
    } 
  }

  const handleOnNext = (controller) => {   
    if(controller != null)
    {
      setErrors(noErrors);
      setLoading(true);
      setStepInfo({
        ...stepInfo,
        newStep: stepInfo.currentStep
      })
      controller
        .checkAll(data)
        .then(results => {
          let errors = {};
          results.forEach(result => {
            if (result === 'noError') {
              setStepInfo({
                ...stepInfo,
                newStep: stepInfo.currentStep + 1
              })              
              return;
            }

            errors[result] = true;
          });

          setErrors(errors);
          setLoading(false);
        });
    }
  }

  const elementsList = getElements({
    handleDataChange: handleDataChange,
    data: data,
    errors: errors
  })
  const elementsNumber = elementsList.length;

  return (
    <Grid
      className={classes.pageContainer}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >        
      <Paper className={classes.paper}>
        <SignUpStepper
          steps={elementsNumber}
          onClick={() => handleOnNext(elementsList[stepInfo.currentStep].controller)}
          optionalSteps={[1,2,3]}
          element={stepInfo.currentStep > elementsNumber ? null : elementsList[stepInfo.currentStep].element}
          currentStep={step => setStepInfo({
            ...stepInfo,
            currentStep: step,
          })}
          newStep={stepInfo.newStep}
          user={setUser()}
          profileImage={data.profileImage}
          termsAndService
          loading={loading}
          completed={
            <SignUpCompleted/>
          }
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
    </Grid>
  );
}