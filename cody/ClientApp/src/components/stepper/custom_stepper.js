import React from 'react';

import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PageController } from 'src/lib/page_controller';
import { StepperTopArea } from './stepper_top_area';
import { useStepper } from './use_stepper';
import { StepperLeftButton } from './stepper_left_button';
import { StepperRightButton } from './stepper_right_button';
import { DialogBase } from '../bases/dialog_base';


const useStyles = makeStyles((theme) => ({
  formCompletedButton: {
    marginTop: theme.spacing(2),
  },
  formCompletedDialog: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(8)}px !important`
    },
  }
}));

export function CustomStepper(props){
  const classes = useStyles();

  const elements = props.elements;
  const totalStep = elements.length;

  const [activeStep, stepperHandlers] = useStepper(totalStep);
  const [openFormCompleted, setOpenFormCompleted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const content = props.elements[activeStep].element

  const handleNextWithFormControl = () => {
    setLoading(true);
    const controller = props.elements[activeStep].controller;
    const data = props.data;
    if(controller === null){
      stepperHandlers.handleNext()
      return;
    }

    controller
      .checkAll(data)
      .then(results => {
        let errors = {};
        results.forEach(result => {
          if (result === 'noError') {
            stepperHandlers.handleNext()
            return;
          }

          errors[result] = true;
        });

        props.setErrors(errors);
        setLoading(false);
      });
  }

  const handlNextFormCompleted = () => {
    setLoading(true)

    props
      .onFormCompleted()
      .then((state) => {
        setLoading(false)
        setOpenFormCompleted(state)
      })
  }

  return (
    <>
      <StepperTopArea
        activeStep={activeStep}
        steps={props.elements}
      />
      <Grid
        container
        direction="column"
      > 
        {content}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <StepperLeftButton 
            activeStep={activeStep}
            onBack={() => stepperHandlers.handleBack()}
            hrefFirstPage='/login'
            onBackFirstPage={(e) => PageController.push('/login', e)}
            firstPageLabel="Vai al login"
            disabled={loading}
          />
          <StepperRightButton 
            activeStep={activeStep}
            totalStep={totalStep}
            onNext={handleNextWithFormControl}
            onNextLastPage={handlNextFormCompleted}
            lastPageLabel="Finisci"
            loading={loading}
          />
        </Grid>
      </Grid>
      <DialogBase
        className={classes.formCompletedDialog}
        open={openFormCompleted}
        onClose={() => PageController.refresh()}
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
            onClick={() => PageController.refresh()}
          >
            Vai alla home
          </Button>
        </Grid>
      </DialogBase>
    </>
  );
}



