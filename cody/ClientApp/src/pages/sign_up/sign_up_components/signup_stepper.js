import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Stepper } from '@material-ui/core/';
import { Step } from '@material-ui/core/';
import { StepLabel } from '@material-ui/core/';
import { Button } from '@material-ui/core/';
import { Typography } from '@material-ui/core/';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

import { LoadingButton } from '../../../components/loading_button';
import { AlertDialog } from '../../../components/alert_dialog';

import { User } from '../../../lib/user';
import { ProfilePicture } from '../../../lib/profile_picture';

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
      onMissingFields: null,
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


  _beginRegistration = () => {
    this
      ._createProfilePicture()
      .then(ppId => {
        this._registerUser(ppId);
      });
  }
  
  /**
   * @returns {Promise<number | null>}
   */
  _createProfilePicture = () => {  
    const image = 
      this.props.image;
    
    console.log(image);
    if (!image)
      return new Promise(res => res(null));

    return ProfilePicture.createOrUpdate({
      picture: image,
    });
  }

  /**
   * @param {number} profilePictureId 
   */
  _registerUser = (profilePictureId) => {
    User.tryRegister({
      user: {
        profilePictureId: profilePictureId,
        ...this.props.user
      },
      onSuccess: _ => {
        this.setState({loading: false})
        this.handleNext();
      },
      onError: reasons => {
        this.setState({registerErrors: reasons});
      },
      onMissingFields: reasons =>{
        this.setState({onMissingFields: reasons});
      }
    })
    .then(
      _=> this.setState({loading: true})
    );
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
                          onClick={this._beginRegistration}
                        />
                        <AlertDialog
                          open={
                            this.state.registerErrors != null 
                            || this.state.onMissingFields != null
                          }
                          items={[
                            this.state.registerErrors,
                            this.state.onMissingFields,
                          ]}
                        />
                      </div>
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
                            this.props.onClick()
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
  





