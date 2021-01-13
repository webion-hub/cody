
import React, { Component } from 'react';

import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import { Password } from '../../../../components/password/password_textfield';
import { PwStrengthProgress } from '../../../../components/password/password_strenght_progress';
import { BasePhotoText } from '../../../../components/base_photo_text';
import { NextFocus } from '../../../../lib/next_focus';
import { Colors } from '../../../../lib/default_values/custom_colors';

import { Step1 } from '../../../../components/illustrations/step1';

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
  }

  getPassword(value){
    this.setState({password: value });
    const {password} = this.props;
    password(value);
  }

  getConfirmPassword(value){
    this.setState({confirmPassword: value});
    const {confirmPassword} = this.props;
    confirmPassword(value);
  }
  
  render(){
    return (
      <BasePhotoText
        image={<Step1 size={this.props.imageWidth}/>}
        formWidth={this.props.formWidth}
        bottomMargin={1}
        margin={1}
        items={[
          <Typography
            variant="body2"
            color="secondary"
          >
            Email &amp; Password
          </Typography>,
          <Box>
            <form
              autoComplete="off"
            >
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
                  this.props.errors.email 
                  || this.props.errors.emailExist
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.nextFocus.focusOn("password");
                  }
                }}
              />
            </form>
            <Grid
                container
                direction="row"
                justify="flex-end"
            >
              <Fade
                in={this.props.errors.emailExist}
              >
                <Typography
                  variant="caption"
                  color="error"
                >
                  Email già usata!
                </Typography>
              </Fade>
            </Grid>
          </Box>,
          <Box m={1.5}/>,
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
            <Box m={0.5}/>
            <PwStrengthProgress
              password={this.state.password}
            />
            <Typography
              variant="caption"
              style={{
                color: Colors.lightGrey
              }}
            >
              Tra 8 e 128 caratteri
            </Typography>
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
          ,
        ]}
      />
    );
  }
}




 