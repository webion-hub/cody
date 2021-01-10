
import React, { Component } from 'react';

import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Password } from '../../../components/password/password_textfield';
import { PwStrengthProgress } from '../../../components/password/password_strenght_progress';
import { SignUpBase } from '../sign_up_components/sign_up_base';
import { NextFocus } from '../../../lib/next_focus';
import { Colors } from '../../../index';

import { PasswordController } from '../../../lib/format_controller/password_controller';
import { EmailController } from '../../../lib/format_controller/email_controller';

import { Step1 } from '../../../components/illustrations/step1';

export class EmailPassword extends Component{

  constructor(props) {
    super(props);
    this.getPassword = this.getPassword.bind(this);
    this.getConfirmPassword = this.getConfirmPassword.bind(this);

    this.state = {
      email: this.props.values.email,
      password: this.props.values.password,
      confirmPassword: this.props.values.confirmPassword,   
    };

    this.nextFocus = new NextFocus(["email", "password", "confirmPassword"]);
  }

  getEmail = (event) => {
    this.setState({email: event.target.value });
    const {email} = this.props;
    email(event.target.value); 
  };

  getPassword(value){
    this.setState({password: value });
    const {password} = this.props;
    password(value); 
  };

  getConfirmPassword(value){
    this.setState({confirmPassword: value});
    const {confirmPassword} = this.props;
    confirmPassword(value); 
  }
  
  render(){
    return (
      <SignUpBase
        image={<Step1 size={this.props.imageWidth}/>}
        formWidth={this.props.formWidth}
        margin={1}
        bottomMargin={2}
        items={[
          <Typography
            variant="body2"
            color="secondary"
          >
            Email &amp; Password
          </Typography>,
          <TextField
            id="registration_email"
            label="Email"
            variant="outlined"
            color="secondary"
            value={this.state.email}
            fullWidth={true}
            required={true}
            onChange={this.getEmail}
            inputRef={this.nextFocus.getInput("email")} 
            error={this.props.errors.email}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.nextFocus.focusOn("password");
              }              
           }}         
          />,
          <Box m={3}/>,
          <Box>
            <Password
              label="Password"
              name="new_password"
              labelWidth={85}
              required={true}
              value={this.state.password}
              onChange={this.getPassword}
              inputRef={this.nextFocus.getInput("password")} 
              error={this.props.errors.password}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.nextFocus.focusOn("confirmPassword");
                }
             }}             
            />
            <Typography
              variant="caption"
              style={{
                color: Colors.lightGrey
              }}
            >
              Tra 8 e 128 caratteri
            </Typography>
            <PwStrengthProgress
              password={this.state.password}
            />
          </Box>,
          <Password
            label="Conferma Password"
            labelWidth= {163}
            required={true}
            value={this.state.confirmPassword}
            onChange={this.getConfirmPassword}
            error={this.props.errors.password}
            inputRef={this.nextFocus.getInput("confirmPassword")} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.nextFocus.removeFocus()
              }
           }}
          />
        ]}
      />
    );
  }
}




export class EmailPasswordController{

  removeNoError(array){
    const index = array.indexOf("noError");
    if (index >= 0) {
      array.splice(index, 1);
    }

    return array;
  }

  checkAll(values){
    return new Promise(resolve => {
      const emailController = new EmailController();
      const passwordController = new PasswordController();

      const email = values.email;
      const password = values.password;
      const confirmPassword = values.confirmPassword;

      let errorsList = ["noError"];

      Promise.all([
        emailController.checkEmail(email)
        .then(
          result => {
            if(result) {
              errorsList.push("emailError");
              errorsList = this.removeNoError(errorsList);
            }            
          },
        ),       
        passwordController.checkPassword(password, confirmPassword)
        .then(
          result => {
            if(result) {
              errorsList.push("passwordError");
              errorsList = this.removeNoError(errorsList);
            }
          },
        ),
      ])
      .then(_ => {
        resolve(errorsList);
      });
    })
  }
} 