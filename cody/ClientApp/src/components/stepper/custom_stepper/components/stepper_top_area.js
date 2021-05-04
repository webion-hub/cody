import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  stepperTopArea: {
    background: "transparent",
    width: "100%"
  },
}));

export function StepperTopArea(props){
  const classes = useStyles();

  return(
    <Stepper
      className={classes.stepperTopArea}
      activeStep={props.activeStep}
      alternativeLabel
    >
      {props.steps.map((step, index) => {
        return (
          <Step key={index}>
            {
              step.controller === null ? 
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