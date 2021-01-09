import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Stepper } from '@material-ui/core/';
import { Step } from '@material-ui/core/';
import { StepLabel } from '@material-ui/core/';
import { Button } from '@material-ui/core/';
import { Typography } from '@material-ui/core/';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

import { User } from '../../../lib/user';

export class SignUpStepper extends Component {
  constructor(props){
    super(props);
    this.handleCheckErrors = this.handleCheckErrors.bind(this);

    this.state = {
      activeStep: 0,
      skipped: new Set(),
      steps: Array.isArray(props.steps) ? props.steps : Array(props.steps).fill(""),
      stepsContent: props.stepsContent,
      finalStep: props.completed,
      optionalSteps: props.optionalSteps,
    }
  }
  
  handleCheckErrors = (event) => {    
    const {checkErrors} = this.props;
    checkErrors();

    if(!this.props.formError)
      this.handleNext();
  };

  
  isStepOptional = (step) => {
    var isOptional = false;
    for(var i = 0; i < this.state.optionalSteps.length; i++)
    {
      isOptional = step + 1 === this.state.optionalSteps[i];
      if(isOptional)
        return isOptional;
    }   
  }

  isStepSkipped = (step) => {
    return this.state.skipped.has(step);
  }
  
  handleNext = () => {
    let newSkipped = this.state.skipped;
    if (this.isStepSkipped(this.state.activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(this.state.activeStep);
    }
  
    this.setState({activeStep: this.state.activeStep + 1});
    const {currentStep} = this.props;
    currentStep(this.state.activeStep + 1);
  }
  
  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
    const {currentStep} = this.props;
    currentStep(this.state.activeStep - 1);
  }

  handleSkip = () => {
    this.setState({activeStep: this.state.activeStep + 1});
    const {currentStep} = this.props;
    currentStep(this.state.activeStep + 1);
  }

  render(){
    return (
      <Box width={1}>
        <Stepper 
          activeStep={this.state.activeStep}
          alternativeLabel
        >
          {this.state.steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = 
              <Grid
                container
                justify="center"
              >
                <Typography variant="caption">Opzionale</Typography>
              </Grid>;
            }
            if (this.isStepSkipped(index)) {
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
          {this.state.activeStep === this.state.steps.length ? (
            <div>
              <div>
                {this.state.finalStep}
              </div>
              <Grid
                container
                direction="row"
                justify="space-between"
              >
                <Button onClick={this.handleBack}>
                  Indietro
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  href="/"
                  endIcon={<HomeRoundedIcon/>}
                >
                  Vai alla home
                </Button> 
              </Grid>
            </div>
          ) : (
            <div>
              {this.props.element}
              <div>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                >
                  <Button 
                    onClick={this.state.activeStep === 0 ? function() { return undefined; } : this.handleBack} 
                    href={this.state.activeStep === 0 ? "/login" : ""}
                  >
                    Indietro
                  </Button>
                  <div>
                  {this.state.activeStep === this.state.steps.length - 1 ?  
                    (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          User.tryRegister({
                            user: this.props.user,
                            onSuccess: _ => {
                              console.log('success');
                              this.handleNext();
                            },
                            onError: reasons => {
                              reasons.forEach(reason => {                            
                                if(reason == 'email')
                                  console.log("wrong email");
                                  
                                if(reason == 'password')
                                  console.log("password")                            
                              });
                            },
                            onMissingFields: _=>{}
                          });
                        }}
                      >
                        Finisci
                      </Button> 
                    )
                    : 
                    (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          if(this.isStepOptional(this.state.activeStep))
                            this.handleSkip()  
                          else
                            {
                              if(this.props.formError)
                                this.handleCheckErrors();
                              else
                                this.handleNext();
                            }
                        }}
                      >
                        Avanti
                      </Button> 
                    )
                  }
                  </div>
                </Grid>
              </div>
            </div>
          )}
        </div>
      </Box>
    );
  }
}
  





