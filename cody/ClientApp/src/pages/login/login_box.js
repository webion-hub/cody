import React, { Component } from 'react';

import { TextField } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core/';

import { Password } from 'src/components/password/password_textfield';
import { LoadingButton } from 'src/components/buttons/loading_button';
import { NextFocus } from 'src/lib/next_focus';
import  { ForgotPasswordDialog } from './forgot_pw_dialog'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { UserContext } from 'src/components/user_controller_context';
import { User } from 'src/lib/user';

import history from 'src/history'

export class LoginBoxMain extends Component{

  constructor(props){
    super(props);
    this._updatePassword = this._updatePassword.bind(this);
    this.openForgotPw = this.openForgotPw.bind(this);
    this.closeForgotPw = this.closeForgotPw.bind(this);

    this.state = {
      username: '',
      password: '',
      rememberMe: false,
      wrongUsername: false,
      wrongPassword: false,
      loading: false,
      focusPw: false,

      openForgotPw: false,

      loginSuccess: false,
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


  async _tryLogin() {
    this.setState({loginSuccess: false});
    await User.tryLogin({
      userInfo: {
        username: this.state.username,
        password: this.state.password,
        rememberMe: this.state.rememberMe,
      },
      
      onSuccess: _ => this.setState({loginSuccess: true}),
      onUserNotFound: _ => this.setState({wrongUsername: true}),
      onPasswordMismatch: _ => this.setState({wrongPassword: true}),
    })
    .then(_=> {
      this.setState({loading: false});
    });

    if(this.state.loginSuccess){
      this.props.setLogged(true);
    }
  }

  _updateUsername = e => {
    this.setState({username: e.target.value});
  }

  _updatePassword(value) {
    this.setState({password: value});
  }

  _updateRememberMe = e =>  {
    this.setState({rememberMe: !this.state.rememberMe});
  }
  
  openForgotPw(){
    this.setState({openForgotPw: true});
  }
  closeForgotPw(){
    this.setState({openForgotPw: false});
  }

  render(){
    return(
      <Box maxWidth={this.props.size}
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
              name="login_username"
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
              name="login_password"
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
                    onChange={this._updateRememberMe}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    color="textSecondary"
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
            <LoadingButton
              loading={this.state.loading}
              fullWidth={true}
              endIcon={<AccountCircleRoundedIcon/>}
              onClick={_ => {
                this._maybeLogin()
              }}
              label="Accedi"
            />
            <Box mt={1}>
              <Link
                style={{
                  fontSize: 12,
                }}
                component="button"
                variant="body2"
                color="secondary"
                onClick={this.openForgotPw}
              >
                Password dimenticata?
              </Link>
              <ForgotPasswordDialog
                open={this.state.openForgotPw}
                onClose={this.closeForgotPw}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export function LoginBox(props){
  const { logged, setLogged } = React.useContext(UserContext);

  return(
    <LoginBoxMain
      size={props.size}
      setLogged={setLogged}
    />
  );
}