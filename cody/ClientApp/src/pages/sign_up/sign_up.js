import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { EmailPassword, EmailPasswordController } from './sign_up_steps/1_email_password';
import { IDData, IDController } from './sign_up_steps/2_ID_data';
import { OptionalData } from './sign_up_steps/3_optional';
import { SignUpCompleted } from './sign_up_steps/sign_up_completed';

import { SignUpStepper } from './sign_up_components/signup_stepper';
import { User } from '../../lib/user';

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
    this.getCurrentStep = this.getCurrentStep.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      currentStep: 0,
      newStep: 0,

      username: '',
      password: '',
      confirmPassword: '',
      email: '',

      name: '',
      surname: '',
      birthDate: new Date(),

      schoolId: null,

      emailError: false,
      passwordError: false,
      usernameError: false,
      nameError: false,
      surnameError: false,
    }
  }

  handleChange = (prop) => (value) => {
    this.setState({[prop]: value});
  }

  getCurrentStep(step){
    this.setState({currentStep: step});
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

  onClick(controller){   
    if(controller != null)
    {
      this.resetErrors(); 
      this.setState({newStep: this.state.currentStep});
      controller.checkAll(this.state)
      .then(
        results => results.forEach(result => {
          if(result === "emailError")
            this.setState({emailError: true})
          if(result === "passwordError")
            this.setState({passwordError: true})
          if(result === "usernameError")
            this.setState({usernameError: true})
          if(result === "nameError")
            this.setState({nameError: true})
          if(result === "surnameError")
            this.setState({surnameError: true})
          if(result === "noError")
            this.nextStep();
        })
      );    
    }
  }

  resetErrors(){
    this.setState({
      emailError: false,
      passwordError: false,
      usernameError: false,
      nameError: false,
      surnameError: false
    });
  }

  nextStep(){    
    this.setState({newStep: this.state.currentStep + 1});
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
      {
        controller: new EmailPasswordController(),
        element: <EmailPassword
          imageWidth = {imageWidth}
          formWidth = {formWidth}
          email = {this.handleChange("email")}
          password = {this.handleChange("password")}
          confirmPassword = {this.handleChange("confirmPassword")}
          values = {{
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
          }}
          errors = {{
            email: this.state.emailError,
            password: this.state.passwordError,
          }}
        />
      },
      {
        controller: new IDController(),
        element: <IDData
          imageWidth = {imageWidth}
          formWidth = {formWidth}
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
          errors = {{
            username: this.state.usernameError,
            name: this.state.nameError,
            surname: this.state.surnameError,
          }}
        />
      },  
      {
        controller: null,
        element: <OptionalData
          imageWidth = {imageWidth}
          formWidth = {formWidth}
          checkErrors = {this.state.checkErrors}
          school = {this.handleChange("schoolId")}
          values = {{
            schoolId: this.state.schoolId,
          }}
        />, 
      },  
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
              onClick={() => {this.onClick(elements[this.state.currentStep].controller)}}
              optionalSteps={[3]}
              element={elements[this.state.currentStep].element}
              currentStep={this.getCurrentStep}
              newStep={this.state.newStep}
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




