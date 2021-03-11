import React from 'react';

import { LoadingButton } from '../buttons/loading_button';

export function StepperRightButton(props){
  const activeStep = props.activeStep;
  const totalStep = props.totalStep;
  const loading = props.loading;

  const otherPagesRightButton =
    <LoadingButton
      onClick={props.onNext}
      variant="contained"
      color="primary"
      loading={loading}
      label="Avanti"
    />

  const lastPageRightButton = 
    <LoadingButton
      onClick={props.onNextLastPage}
      variant="contained"
      color="primary"
      loading={loading}
      label={props.lastPageLabel}
    />

  const formCompletedRightButton = 
    <LoadingButton
      onClick={props.onNextFormCompletedPage}
      variant="contained"
      color="primary"
      loading={loading}
      label={props.formCompletedLabel}
      href={props.hrefFormCompleted}
    />

  if(props.formCompleted)  
    return formCompletedRightButton
  else if(activeStep === totalStep - 1) 
    return lastPageRightButton
  else  
    return otherPagesRightButton
}