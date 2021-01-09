import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { EmailPassword } from './sign_up_steps/1_email_password';
import { IDData } from './sign_up_steps/2_ID_data';
import { OptionalData } from './sign_up_steps/3_optional';
import { SignUpCompleted } from './sign_up_steps/sign_up_completed';

import { SignUpStepper } from './sign_up_components/signup_stepper';

const base = {
  imageWidth: 330,
  formWidth: 300,
  backgroundImage: "images/bulb.jpeg"  
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export class SignUp extends Component {
  static displayName = SignUp.name;
  constructor() {
    super(); 
    this.getCheckErrors = this.getCheckErrors.bind(this);
    this.getCurrentStep = this.getCurrentStep.bind(this);
    this.formError = this.formError.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      checkErrors: false,
      currentStep: 0,
      formError: true,

      username: '',
      password: '',
      email: '',

      name: '',
      surname: '',
      birthDate: new Date(),

      schoolId: null,
    }
  }

  handleChange = (prop) => (value) => {
    this.setState({[prop]: value});
    this.setState({checkErrors: false});
  }

  setUser(){
    return {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      accountDetail: {
        name: this.state.name,
        surname: this.state.surname,
        birthDate: this.state.birthDate,
        schoolId: this.state.schoolId,
      }
    } 
  }

  getCheckErrors(){
    this.setState({checkErrors: true});
  };

  getCurrentStep(step){
    this.setState({currentStep: step});
    this.setState({checkErrors: false});
    this.setState({formError: true});
  }

  formError(value){
    this.setState({formError: value});
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
        formError = {this.formError}
        email = {this.handleChange("email")}
        password = {this.handleChange("password")}
        values = {{
          email: this.state.email,
          password: this.state.password,
        }}
      />,
      <IDData
        imageWidth = {imageWidth}
        formWidth = {formWidth}
        checkErrors = {this.state.checkErrors}
        formError = {this.formError}
        username = {this.handleChange("username")}
        name = {this.handleChange("name")}
        surname = {this.handleChange("surname")}
        date = {this.handleChange("date")}
        values = {{
          username: this.state.username,
          name: this.state.name,
          surname: this.state.surname,
          birthDate: this.state.birthDate,
        }}
      />,  
      <OptionalData
        imageWidth = {imageWidth}
        formWidth = {formWidth}
        checkErrors = {this.state.checkErrors}
        school = {this.handleChange("schoolId")}
        values = {{
          schoolId: this.state.schoolId,
        }}
      />, 
    ]

    return (  
      <Grid
        style={{
          height: "100vh",
          backgroundImage: `url(${base.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
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
            <SignUpStepper
              steps={3}
              checkErrors={this.getCheckErrors}
              formError={this.state.formError}
              currentStep={this.getCurrentStep}
              optionalSteps={[3]}
              element={elements[this.state.currentStep]}
              user={this.setUser()}
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




