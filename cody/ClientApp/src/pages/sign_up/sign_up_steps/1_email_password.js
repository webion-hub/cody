
import React, {Component} from 'react';

import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Password } from '../../../components/password_textfield';
import { PwStrengthProgress } from '../../../components/password_strenght_progress';
import { SignUpBase } from '../sign_up_base';
import { Colors } from '../../../index';

import { FormatControl } from '../../../components/format_control/format_control';
import { PasswordControl } from '../../../components/format_control/password_control';
import { EmailControl } from '../../../components/format_control/email_control';

import { Step1 } from '../../../components/illustrations/step1';

export class EmailPassword extends Component{

  constructor(props) {
    super(props);
    this.getPassword = this.getPassword.bind(this);
    this.getConfirmPassword = this.getConfirmPassword.bind(this);
    
    this.formatControl = new FormatControl();
    this.pwControl = new PasswordControl();
    this.emailControl = new EmailControl();

    this.state = {
      email: this.props.values.email,
      password: this.props.values.password,
      confirmPassword: '',      
    }

    const areErrorsCheck = this.formatControl.areErrorsPWEmail(
      this.state.password,
      this.state.confirmPassword, 
      this.state.email);

    const {areErrors} = this.props;
    areErrors(areErrorsCheck);
  }

  getEmail = (event) => {
    this.setState({email: event.target.value });
    const {areErrors} = this.props;
    const {email} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsPWEmail(
      this.state.password,
      this.state.confirmPassword, 
      event.target.value);

    areErrors(areErrorsCheck);
    email(event.target.value);
  };

  getPassword(value){
    this.setState({password: value });
    const {areErrors} = this.props;
    const {password} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsPWEmail(
      value,
      this.state.confirmPassword, 
      this.state.email);
    
    areErrors(areErrorsCheck);
    password(value);
  };

  getConfirmPassword(value){
    this.setState({confirmPassword: value});
    const {areErrors} = this.props;
    
    const areErrorsCheck = this.formatControl.areErrorsPWEmail(
      this.state.password,
      value, 
      this.state.email);

    areErrors(areErrorsCheck);
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
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            color="secondary"
            value={this.props.values.email}
            fullWidth={true}
            required={true}
            onChange={this.getEmail}
            error={
              this.props.checkErrors && 
              this.emailControl.isEmailWrong(this.state.email)
            }            
          />,
          <Box m={3}/>,
          <Box>
            <Password
              label="Password"
              labelWidth={70}
              required={true}
              value={this.props.values.password}
              onChange={this.getPassword}
              error={
                this.props.checkErrors && 
                this.pwControl.arePwWrong(this.state.password, this.state.confirmPassword)
              }
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
            labelWidth= {148}
            required={true}
            onChange={this.getConfirmPassword}
            error={
              this.props.checkErrors && 
              this.pwControl.arePwWrong(this.state.password, this.state.confirmPassword)
            }
          />
        ]}
      />
    );
  }
}




