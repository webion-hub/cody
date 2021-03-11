import React from 'react';
import { Stepper } from '@material-ui/core/';
import { Step } from '@material-ui/core/';
import { StepLabel } from '@material-ui/core/';

export function StepperTopArea(props){
  return(
    <Stepper
      activeStep={props.activeStep}
      alternativeLabel
    >
      {props.steps.map((step, index) => {
        return (
          <Step key={index}>
            {
              step.optional ? 
                <StepLabel>Opzionale</StepLabel>
                :
                <StepLabel></StepLabel>
            }            
          </Step>
        );
      })}
    </Stepper>
  )
}