import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
  }));
  
  
  export function HorizontalLinearStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  
    const steps =  Array.isArray(props.steps) ? props.steps : Array(props.steps).fill("");

    const stepsContent = props.stepsContent;
    const finalSteps = props.completed;
    const optionalSteps = props.optionalSteps;
  
    function getStepContent(step) {
      if(step >= steps.length)
        return 'Passo sconosciuto';
      
      return stepsContent[step];
    }
  
    const isStepOptional = (step) => {
      var isOptional = false;
      for(var i = 0; i < optionalSteps.length; i++)
      {
        isOptional = step + 1 === optionalSteps[i];
        if(isOptional)
          return isOptional;
      }   
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("Errore, non puoi saltare questo passo.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
    
    return (
      <div className={classes.root}>
        <Stepper 
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = 
              <Grid
                container
                justify="center"
              >
                <Typography variant="caption">Opzionale</Typography>
              </Grid>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={index} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <div>
                {finalSteps}
              </div>
              <Button onClick={handleBack} className={classes.button}>
                Indietro
              </Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                >
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Indietro
                  </Button>
                  <div>
                    {isStepOptional(activeStep) && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSkip}
                        className={classes.button}
                      >
                        Salta
                      </Button>
                    )}
  
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? 'Finisci' : 'Avanti'}
                    </Button>
                  </div>
                </Grid>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  