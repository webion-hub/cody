import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Stepper } from '@material-ui/core/';
import { Step } from '@material-ui/core/';
import { StepLabel } from '@material-ui/core/';
import { Button } from '@material-ui/core/';
import { Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

import { LoadingButton } from '../../../components/loading_button';
import { AlertDialog } from '../../../components/alert_dialog';

import { User } from '../../../lib/user';


const StyledStepper = withStyles({
  root: {
    padding: "24px 0px 24px 0px"
  },
})(Stepper);


export class SignUpStepper extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeStep: 0,
      skipped: new Set(),
      steps: Array.isArray(props.steps) ? props.steps : Array(props.steps).fill(""),
      stepsContent: props.stepsContent,
      finalStep: props.completed,
      optionalSteps: props.optionalSteps,

      loading: false,
      registerErrors: null,
      missingFields: null,
      imageUploadError: null,

      openAlert: false,
    }
  }
  
  componentDidUpdate(prevProps, prevState){
    if(prevProps.newStep < this.props.newStep)
    {
      this.handleNext();
    }
  }
  
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
    this.setState({activeStep: this.state.activeStep + 1});
    const {currentStep} = this.props;
    currentStep(this.state.activeStep + 1);
  }

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
    const {currentStep} = this.props;
    currentStep(this.state.activeStep - 1);
  }

  handleAlertClose = () => {
    this.setState({openAlert: false})
  }


  
  
  _registerUser = () => {
    this.setState({loading: true});
    User.tryRegister({
      user: this.props.user,
      profilePicture: this.props.profileImage,

      onSuccess: uid => {
        this.handleNext();
      },
      onError: reasons => {
        this.setState({
          registerErrors: reasons,
          openAlert: true,
        });
      },
      onMissingFields: reasons => {
        this.setState({
          missingFields: "Manca " + reasons,
          openAlert: true,
        });
      },
      onImageUploadError: _ => {
        this.setState({
          imageUploadError: "Prova a ricaricare l'immagine più tardi.",
          openAlert: true,
        });
      },
    }).finally(
      () => {
        this.setState({loading: false});
      }
    );
  }


  render(){
    return (
      <Box width={1}>
        <StyledStepper 
          activeStep={this.state.activeStep}
          alternativeLabel
          style={{
            padding: "0 !important"
          }}
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
        </StyledStepper>
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
                <Button disabled>
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
                    disabled={this.state.loading}
                  >
                    Indietro
                  </Button>
                  <div>
                  {this.state.activeStep === this.state.steps.length - 1 ?  
                    (
                      <div>
                        <LoadingButton
                          loading={this.state.loading}
                          label="Finisci"
                          onClick={this._registerUser}
                        />
                        <AlertDialog
                          open={this.state.openAlert}
                          onClose={this.handleAlertClose}
                          items={[
                            this.state.registerErrors,
                            this.state.onMissingFields,
                            this.state.imageUploadError,
                            "Prova a ricaricare l'immagine più tardi.",
                            "serverError",
                          ]}
                        />
                      </div>
                    )
                    : 
                    (
                      <LoadingButton 
                        loading={this.props.loading}
                        label="Avanti"
                        onClick={() => {
                          if(this.isStepOptional(this.state.activeStep))
                            this.handleNext()  
                          else
                            this.props.onClick()
                        }}
                      />
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
  





