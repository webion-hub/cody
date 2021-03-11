import React from 'react';

import { Grid } from '@material-ui/core';

import { PageController } from 'src/lib/page_controller';
import { StepperTopArea } from './stepper_top_area';
import { useStepper } from './use_stepper';
import { StepperLeftButton } from './stepper_left_button';
import { StepperRightButton } from './stepper_right_button';

export function CustomStepper(props){
  const elements = props.elements;
  const totalStep = elements.length;

  const [activeStep, stepperHandlers] = useStepper(totalStep);
  const [formCompleted, setFormCompleted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const content = formCompleted ?
    props.formCompleted
    :
    props.elements[activeStep].element

  const handleNextWithFormControl = () => {
    const controller = props.elements[activeStep].controller;
    const data = props.data;

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
        setFormCompleted(state)
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
            disabled={formCompleted || loading}
          />
          <StepperRightButton 
            activeStep={activeStep}
            totalStep={totalStep}
            onNext={handleNextWithFormControl}
            onNextLastPage={handlNextFormCompleted}
            lastPageLabel="Finisci"
            loading={loading}
            formCompleted={formCompleted}
            formCompletedLabel="Vai alla home"
            hrefFormCompleted='/'
            onNextFormCompletedPage={() => PageController.refresh()}
          />
        </Grid>
      </Grid>
    </>
  );
}



