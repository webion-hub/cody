import React from 'react';

export function useStepper(maxSteps){
  const [activeStep, setActiveStep] = React.useState(0);


  const handleNext = (areErrors) => {
    const newStep = activeStep + 1;
    if(newStep >= maxSteps){
      setActiveStep(maxSteps - 1)
      return;
    }
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    const newStep = activeStep - 1;
    if(newStep <= 0){
      setActiveStep(0)
      return;
    }

    setActiveStep(activeStep - 1)
  }

  return [
    activeStep, 
    {
      handleNext: handleNext, 
      handleBack: handleBack
    }
  ]
}