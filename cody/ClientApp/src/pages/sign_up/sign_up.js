import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { EmailPassword } from './sign_up_steps/1_email_password/email_password_step';
import { EmailPasswordController } from './sign_up_steps/1_email_password/email_password_controller';

import { IDData } from './sign_up_steps/2_ID_data/id_step';
import { IDController } from './sign_up_steps/2_ID_data/id_controller';

import { OptionalData } from './sign_up_steps/3_optional/optional_step';

import { SignUpCompleted } from './sign_up_steps/sign_up_completed';
import { SignUpStepper } from './sign_up_components/signup_stepper';

import { Form } from '../../lib/default_values/sizes/form_size';
import { Images } from '../../lib/default_values/images';

import history from 'src/history';

const CustomPaper = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginTop: 56,
    },
  },
}))(Paper);

export class SignUp extends Component {
  static displayName = SignUp.name;
  constructor() {
    super(); 
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      currentStep: 0,
      newStep: 0,
      loading: false,

      username: '',
      password: '',
      confirmPassword: '',
      email: '',

      name: '',
      surname: '',
      birthDate: new Date(),

      profileImage: null,
      school: null,
      isAddedSchool: false,

      emailError: false,
      emailExist: false,
      passwordError: false,
      usernameError: false,
      usernameExist: false,
      nameError: false,
      surnameError: false,
    }
  }

  handleChange = (prop) => (value) => {
    this.setState({[prop]: value});
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
        schoolId: this.state.school ? this.state.school.id : null,
      }
    } 
  }

  onClick(controller){   
    if(controller != null)
    {
      this.resetErrors();
      this.setState({
        newStep: this.state.currentStep,
        loading: true,
      });
      controller
        .checkAll(this.state)
        .then(results => {
          let errors = {};
          results.forEach(result => {
            if (result === 'noError') {
              errors.newStep = this.state.currentStep + 1;
              return;
            }

            errors[result] = true;
          });

          this.setState(errors);
          this.setState({loading: false});
        });
    }
  }

  resetErrors(){
    this.setState({
      emailError: false,
      emailExist: false,
      passwordError: false,
      usernameError: false,
      usernameExist: false,
      nameError: false,
      surnameError: false,
    });
  }

  render () {

    //
    //The props values is used for setting the default values of each textfield
    //
    
    let elements = [
      {
        controller: new EmailPasswordController(),
        element: <EmailPassword
          imageWidth = {Form.imageWidth}
          formWidth = {Form.width}
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
            emailExist: this.state.emailExist,
            password: this.state.passwordError,
          }}
        />
      },
      {
        controller: new IDController(),
        element: <IDData
          imageWidth = {Form.imageWidth}
          formWidth = {Form.width}
          username = {this.handleChange("username")}
          name = {this.handleChange("name")}
          surname = {this.handleChange("surname")}
          birthDate = {this.handleChange("birthDate")}
          values = {{
            username: this.state.username,
            name: this.state.name,
            surname: this.state.surname,
            birthDate: this.state.birthDate,
          }}
          errors = {{
            username: this.state.usernameError,
            usernameExist: this.state.usernameExist,
            name: this.state.nameError,
            surname: this.state.surnameError,
          }}
        />
      },  
      {
        controller: null,
        element: <OptionalData
          imageWidth = {Form.imageWidth}
          formWidth = {Form.width}
          checkErrors = {this.state.checkErrors}
          school = {this.handleChange("school")}
          isAddedSchool = {this.handleChange("isAddedSchool")}
          profileImage = {this.handleChange("profileImage")}
          values = {{
            school: this.state.school,
            isAddedSchool: this.state.isAddedSchool,
          }}
        />, 
      },
    ]

    const elementsNumber = elements.length;

    return (
      <Grid
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${Images.forestImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >        
        <CustomPaper elevation={3}>
          <SignUpStepper
            steps={elementsNumber}
            onClick={() => {this.onClick(elements[this.state.currentStep].controller)}}
            optionalSteps={[3]}
            element={this.state.currentStep > elementsNumber ? null : elements[this.state.currentStep].element}
            currentStep={this.handleChange("currentStep")}
            newStep={this.state.newStep}
            user={this.setUser()}
            profileImage={this.state.profileImage}
            termsAndService={true}
            loading={this.state.loading}
            completed={
              <SignUpCompleted
                imageWidth = {Form.imageWidth}
                formWidth = {Form.width}
              />
            }
          />
        </CustomPaper>
        <div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignContent="flex-start"
          >
            <Typography
              variant="caption"
              style={{
                marginRight: 5,
                color: "#d0d0d0"
              }}
            >
              Registrandoti accetti i nostri
            </Typography>
            <Link
              component="button"
              variant="caption"
              onClick={() => history.push('/terms_and_services')}
              style={{
                fontWeight: "bold",
                color: "#d0d0d0"
              }}
            >
              termini di servizio.
            </Link>
          </Grid>
        </div>
      </Grid>
    );
  }
}