
import React, {Component} from 'react';

import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Password } from '../../../components/password_textfield';
import { SignUpBase } from '../sign_up_base';
import { Colors } from '../../../index';

import { FormatControl } from '../../../components/format_control/format_control';
import { PasswordControl } from '../../../components/format_control/password_control';
import { EmailControl } from '../../../components/format_control/email_control';

import { Step1 } from '../../../components/illustrations/step1';

export class EmailPassword extends Component{

  constructor(props) {
    super(props);
    this.getPassword = this.getPassword.bind(this)
    this.getConfirmPassword = this.getConfirmPassword.bind(this)
    
    this.formatControl = new FormatControl();
    this.pwControl = new PasswordControl();
    this.emailControl = new EmailControl();

    this.state = {
      password: '',
      confirmPassword: '',
      email: '',
    }

    const {areErrors} = this.props;
    areErrors(true);
  }



  getEmail = (event) => {
    this.setState({email: event.target.value });
    const {areErrors} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsPWEmail(
      this.state.password,
      this.state.confirmPassword, 
      event.target.value);

    areErrors(areErrorsCheck);
  };

  getPassword(value){
    this.setState({password: value });
    const {areErrors} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsPWEmail(
      value,
      this.state.confirmPassword, 
      this.state.email);

    areErrors(areErrorsCheck);
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
            fullWidth={true}
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
              Tra 6 e 16 caratteri
            </Typography>
          </Box>,
          <Password
            label="Conferma Password"
            labelWidth= {148}
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

