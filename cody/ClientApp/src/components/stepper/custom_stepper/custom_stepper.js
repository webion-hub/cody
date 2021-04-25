import React from 'react';

import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PageController } from 'src/lib/page_controller';
import { StepperTopArea } from './components/stepper_top_area';
import { useStepper } from './hooks/use_stepper';
import { StepperLeftButton } from './components/stepper_left_button';
import { StepperRightButton } from './components/stepper_right_button';
import { DialogBase } from 'src/components/bases/dialog_base';
import { PaperWithTransitionBase } from 'src/components/bases//paper_with_transition_base';


const useStyles = makeStyles((theme) => ({
  formCompletedButton: {
    marginTop: theme.spacing(2),
  },
  formCompletedDialog: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(8)}px !important`
    },
  },
  buttons: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2)
    },
  }
}));

export function CustomStepper(props){
  const classes = useStyles();

  const elements = props.elements;
  const totalStep = elements.length;

  const [activeStep, stepperHandlers] = useStepper(totalStep);
  const [stepperState, setStepperState] = React.useState("");

  const content = props.elements[activeStep].element
  const height = props.elements[activeStep].height

  const handleNextWithFormControl = () => {
    setStepperState("loading");

    const controller = props.elements[activeStep].controller;
    const data = props.data;
    if(controller === null || controller === undefined){
      stepperHandlers.handleNext()
      setStepperState("");
      return;
    }

    controller
      .checkAll({
        values: data,
        onErrors: handleErrors,
        onNoErrors: handleNoErrors
      })
  }

  const handleErrors = (errors) => {
    props.setErrors(errors)
    setStepperState("")
  }

  const handleNoErrors = () => {
    props.setErrors({})
    if(activeStep === totalStep - 1)
      handleLastStep()
    else 
      handleMiddleSteps()            
  }


  const handleLastStep = () => {
    props
      .onFormCompleted()
      .then((state) => {
        if(state)
          setStepperState("openDialog");
        else
          setStepperState("");
      })
  }

  const handleMiddleSteps = () => {
    stepperHandlers.handleNext()
    setStepperState("");
  }


  return (
    <>
      <PaperWithTransitionBase
        component={props.component}
        width={616}
        height={height}
        extraHeightOnMobile={32}
        direction="column"
        title={
          <StepperTopArea
            activeStep={activeStep}
            steps={props.elements}
          />
        }
      >
        {content}
        <Grid
          className={classes.buttons}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <StepperLeftButton 
            activeStep={activeStep}
            onBack={() => stepperHandlers.handleBack()}
            hrefFirstPage={props.hrefFirstPage}
            onBackFirstPage={props.onBackFirstPage}
            firstPageLabel={props.firstPageLabel}
            disabled={stepperState === "loading"}
          />
          <StepperRightButton 
            activeStep={activeStep}
            totalStep={totalStep}
            onNext={handleNextWithFormControl}
            lastPageLabel="Finisci"
            loading={stepperState === "loading"}
          />
        </Grid>
      </PaperWithTransitionBase>
        <DialogBase
          className={classes.formCompletedDialog}
          open={stepperState === "openDialog"}
          onClose={props.onGoHomeClicked}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {props.formCompleted}
            <Button
              className={classes.formCompletedButton}
              variant="contained"
              color="primary"
              onClick={props.onGoHomeClicked}
            >
              Vai alla home
            </Button>
          </Grid>
        </DialogBase>
    </>
  );
}