
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
      confirmPassword: '',   
      
      passwordError: false,
      emailError: false,
    };

    this.updateFormErrors(
      this.state.email,
      this.state.password,
      this.state.confirmPassword,
    );

    this.nextFocus = new NextFocus(["email", "password", "confirmPassword"]);
  }

  getEmail = (event) => {
    this.setState({email: event.target.value });
    
    this.updateFormErrors(
      event.target.value,
      this.state.password,
      this.state.confirmPassword,
    );


  };

  getPassword(value){
    this.setState({password: value });

    this.updateFormErrors(
      this.state.email,
      value,
      this.state.confirmPassword,
    );

  };

  getConfirmPassword(value){
    this.setState({confirmPassword: value});

    this.updateFormErrors(
      this.state.email,
      this.state.password,
      value,
    );
  }


  updateFormErrors(email, password, confirmPassword){
    const pwControl = new PasswordController();
    const emailControl = new EmailController();

    pwControl.checkPassword(password, confirmPassword).then(
      result => {
        this.setState({passwordError: result});
      }
    ); 

    emailControl.checkEmail(email).then(
      result => {
        this.setState({emailError: result});
      }
    );        
  }

  componentDidUpdate(prevProps, prevState){
    const emailUpdate = prevState.emailError != this.state.emailError
    const passwordUpdate = prevState.passwordError != this.state.passwordError;

    if(emailUpdate || passwordUpdate)
    {
      const {formError} = this.props;
      const {email} = this.props;    
      const {password} = this.props;
      
      formError(this.state.passwordError || this.state.emailError);   
      email(this.state.email);  
      password(this.state.password);   
    }
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
            error={
              this.state.emailError &&
              this.props.checkErrors
            }
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
              error={
                this.state.passwordError &&
                this.props.checkErrors
              }
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
            onChange={this.getConfirmPassword}
            error={
              this.state.passwordError && this.props.checkErrors
            }
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




