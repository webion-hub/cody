import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { EmailPassword } from './sign_up_steps/1_email_password';
import { IDDatas } from './sign_up_steps/2_ID_datas';
import { OptionalDatas } from './sign_up_steps/3_optional';
import { SignUpCompleted } from './sign_up_steps/sign_up_completed';

import { HorizontalLinearStepper } from '../../components/stepper';
import { updateElementAccess } from 'typescript';

const base = {
  imageWidth: 330,
  formWidth: 300,
  backgroundImage: "images/forest.jpeg"  
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export class SignUp extends Component {
  static displayName = SignUp.name;
  constructor() {
    super(); 
    this.getCheckErrors = this.getCheckErrors.bind(this);
    this.getCurrentStep = this.getCurrentStep.bind(this);
    this.areErrors = this.areErrors.bind(this);

    this.state = {
      checkErrors: false,
      currentStep: 0,
      areErrors: false,
    }
  }

  getCheckErrors(){
    this.setState({checkErrors: true});
  };

  getCurrentStep(step){
    this.setState({currentStep: step});
    this.setState({checkErrors: false});
    this.setState({areErrors: false});
  }

  areErrors(value){
    this.setState({areErrors: value});
  }

  render () {
    const screenWidth = getWindowDimensions().width;
    const isImageBigger = base.imageWidth > screenWidth;
    const isFormBigger = base.formWidth > screenWidth;
    const isImageOrFormBigger = isImageBigger || isFormBigger;

    const padding = 3;

    const imageWidth = isImageBigger ?
      screenWidth - 5:
      base.imageWidth;

    const formWidth = isFormBigger ? 
      screenWidth - 5 : 
      base.formWidth;
    
    const sidePadding = isImageOrFormBigger ? 
      0 : 
      padding;


    let elements = [
      <EmailPassword
        imageWidth = {imageWidth}
        formWidth = {formWidth}
        checkErrors = {this.state.checkErrors}
        areErrors = {this.areErrors}
      />,
      <IDDatas
        imageWidth = {imageWidth}
        formWidth = {formWidth}
        checkErrors = {this.state.checkErrors}
        areErrors = {this.areErrors}
      />,    
      <OptionalDatas
        imageWidth = {imageWidth}
        formWidth = {formWidth}
        checkErrors = {this.state.checkErrors}
      />,      
    ]

    return (  
      <Grid
        style={{
          height: "100vh",
          backgroundImage: `url(${base.backgroundImage})`
        }}
        container
        justify="center"
        alignItems="center"
      >        
        <Paper elevation={3}>
          <Box 
            pt={padding}
            pb={padding}
            pl={sidePadding}
            pr={sidePadding}
          >
            <HorizontalLinearStepper
              steps={3}
              checkErrors={this.getCheckErrors}
              areErrors={this.state.areErrors}
              currentStep={this.getCurrentStep}
              optionalSteps={[3]}
              element={elements[this.state.currentStep]}
              completed={
                <SignUpCompleted
                    imageWidth = {imageWidth}
                    formWidth = {formWidth}
                />
              }
            />
          </Box>
        </Paper>
      </Grid>
    );
  }
}




