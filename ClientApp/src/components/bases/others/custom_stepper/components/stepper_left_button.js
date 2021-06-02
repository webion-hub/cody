import React from 'react';

import { LoadingButton } from '../../../../buttons/loading_button';

export function StepperLeftButton(props){
  const activeStep = props.activeStep;
  const loading = props.loading;

  const otherPagesleftButton =
    <LoadingButton
      onClick={props.onBack}
      loading={loading}
      label="Indietro"
      variant="text"
      color="inherit"
      disabled={props.disabled}
    />

  const firstPageLeftButton = 
    <LoadingButton
      onClick={props.onBackFirstPage}
      loading={loading}
      label={props.firstPageLabel}
      variant="text"
      color="inherit"
      disabled={props.disabled}
      href={props.hrefFirstPage}
    />
      
  return activeStep === 0 ? 
      firstPageLeftButton : otherPagesleftButton
}