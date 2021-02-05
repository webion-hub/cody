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

import { LoadingButton } from 'src/components/buttons/loading_button';
import { AlertDialog } from 'src/components/dialogs/alert_dialog';

import { User } from 'src/lib/user';
import { ProfilePicture } from 'src/lib/profile_picture';
import { UserContext } from 'src/components/user_controller_context';

import history from 'src/history'

const StyledStepper = withStyles({
  root: {
    padding: "24px 0px 24px 0px"
  },
})(Stepper);


export class SignUpStepperMain extends Component {
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


  
  
  _registerUser = async () => {
    this.setState({loading: true});
    await User.tryRegister({
      user: this.props.user,

      onSuccess: uid => {
        this.handleNext();
      },
      onError: reasons => {
        this.setState({
          registerErrors: [reasons.map(e => ({
            username: <Typography variant="body2">errore inserimento username</Typography>,
            name: <Typography variant="body2">errore inserimento nome</Typography>, 
            surname: <Typography variant="body2">errore inserimento cognome</Typography>, 
            email: <Typography variant="body2">errore inserimento email</Typography>,
            password: <Typography variant="body2">errore inserimento password</Typography>,
            birthDate: <Typography variant="body2">errore inserimento data nascita</Typography>,
          }[e]))],
          openAlert: true,
        });
      },
      onMissingFields: reasons => {
        this.setState({
          missingFields: <Typography variant="body2">Manca data di nascita</Typography>,  
          openAlert: true,
        });
      },
    });

    await this._maybeUploadImage();
    this.setState({loading: false});
  }

  _maybeUploadImage = async () => {
    if (this.props.profileImage == null)
      return;

    return ProfilePicture.createOrUpdate({
      base64: this.props.profileImage,
    })
    .catch(_ => {
      this.setState({
        imageUploadError: <Typography variant="body2">Prova a ricaricare l'immagine più tardi.</Typography>,
        openAlert: true,
      });
    });
  };


  render(){
    return (
      <Box width={1}>
        <StyledStepper 
          activeStep={this.state.activeStep}
          alternativeLabel
          style={{
            padding: "0 !important",
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
                  onClick={() => {
                    this.props.setLogged(true)
                    history.push('/');                
                  }}
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
                    onClick={this.state.activeStep === 0 ? 
                        () => history.push('/login') : 
                        this.handleBack
                    } 
                    disabled={this.state.loading}
                  >
                    {this.state.activeStep === 0 ? "Vai al login" : "Indietro"}
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
                            <Grid
                              container
                              direction="column"
                            >
                              {this.state.registerErrors}
                            </Grid>,
                            this.state.missingFields,
                            this.state.imageUploadError,
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
  

export function SignUpStepper(props){
  const { setLogged } = React.useContext(UserContext);

  return (
    <SignUpStepperMain
      steps={props.steps}
      onClick={props.onClick}
      optionalSteps={props.optionalSteps}
      element={props.element}
      currentStep={props.currentStep}
      newStep={props.newStep}
      user={props.user}
      profileImage={props.profileImage}
      termsAndService={props.termsAndService}
      loading={props.loading}
      completed={props.completed}

      setLogged={setLogged}
    />
  );
}




