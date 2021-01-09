import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'

import { TextField } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core/';
import { CircularProgress } from '@material-ui/core';

import { Password } from '../../components/password/password_textfield';
import { NextFocus } from '../../lib/next_focus';
import { Colors } from '../../index';

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { User } from '../../lib/user';

import SingleXHRRequest from '../../lib/single_xhr_request';


export class LoginBox extends Component{

  constructor(props){
    super(props);
    this._updatePassword = this._updatePassword.bind(this)

    this.state = {
      username: '',
      password: '',
      wrongUsername: false,
      wrongPassword: false,
      loading: false,
      navigateToHome: false,
      focusPw: false,
      loginRequest: new SingleXHRRequest(),
    }

    this.nextFocus = new NextFocus(["username","password"]);
  }

  _maybeLogin() {
    this.setState({wrongUsername: false});
    this.setState({wrongUsername: false});

    if (!this.state.username)
      this.setState({wrongUsername: true});

    if (!this.state.password)
      this.setState({wrongPassword: true});

    if (!this.state.username || !this.state.password)
      return;

    this.setState({loading: true});
    this._tryLogin();
  }


  _tryLogin() {
    let success = false;
    this.state.loginRequest.send(async tokenSource => {
      await User.tryLogin({
        username: this.state.username,
        password: this.state.password,
        cancelToken: tokenSource.token,
        
        onSuccess: _ => success = true,
        onUserNotFound: _ => this.setState({wrongUsername: true}),
        onPasswordMismatch: _ => this.setState({wrongPassword: true}),
      })
      .then(
        _=> this.setState({loading: false})
      ); 

      if(success)
        this.setState({navigateToHome: true})
    });
  }

  _updateUsername = e => {
    this.setState({username: e.target.value});
  }

  _updatePassword(value) {
    this.setState({password: value});
  }
  

  render(){
    return(
      <Box width={this.props.size}
        justifyContent="center"
        display="flex"
        position="relative"
      >     
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              color="secondary"
              fullWidth={true}
              onChange={this._updateUsername}
              error={this.state.wrongUsername}
              inputRef={this.nextFocus.getInput("username")} 
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.nextFocus.focusOn("password");
                }              
             }}  
            />
            <Box m={0.5}/>
            <Password
              label="Password"
              labelWidth={70}
              onChange={this._updatePassword}
              inputRef={this.nextFocus.getInput("password")} 
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this._maybeLogin();
                  this.nextFocus.removeFocus();
                }
             }}
              error={this.state.wrongPassword}
            />
            <Grid
              container
              justify="flex-start"
            >
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    color="secondary"
                    size="small"
                    style={{
                      color: Colors.lightGrey
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    style={{
                      color: Colors.lightGrey
                    }}
                  >
                    Ricordami
                  </Typography>
                }
                labelPlacement="end"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.loading}
              fullWidth={true}
              endIcon={<AccountCircleRoundedIcon/>}
              onClick={_ => this._maybeLogin()}
            >
              {
                this.state.loading ? 
                (              
                  <CircularProgress
                    color="secondary"
                    size={25}
                    style={{
                      position: "absolute"
                    }}
                  />   
                ): null
              }
              Accedi
            </Button>                
            {
              this.state.navigateToHome ? (<Redirect to="/"/>) : null
            }     
            <Box mt={1}>
              <Link
                style={{
                  fontSize: 12,
                }}
                component="button"
                variant="body2"
                color="secondary"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
                Password dimenticata?
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }
}
