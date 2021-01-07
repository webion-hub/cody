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

import { Password } from './password_textfield'
import { Colors } from '../index';

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { User } from '../lib/user';


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
      navigatoToHome: false,
    }
  }

  /**
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} e 
   */
  _updateUsername = e => {
    this.setState({username: e.target.value});
  };

  /**
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} e 
   */
  _updatePassword(value){
    this.setState({password: value});
  };

  render(){
    return(
    <div>
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
            />
            <Box m={0.5}/>
            <Password
              label="Password"
              labelWidth={70}
              onChange={this._updatePassword}
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
              onClick={() => {
                this.setState({wrongUsername: false});
                this.setState({wrongUsername: false});

                if(this.state.username != 0 && this.state.password != 0)
                {
                  this.setState({loading: true});
                  User.tryLogin({
                    username: this.state.username,
                    password: this.state.password,
                    onSuccess: _ => this.setState({navigatoToHome: true}),
                    onUserNotFound: _ => this.setState({wrongUsername: true}),
                    onPasswordMismatch: _ => this.setState({wrongPassword: true}),
                  }).then(
                    _=> {
                      this.setState({loading: false})
                    }
                  );
                }
                else
                {
                  this.setState({wrongUsername: true});
                  this.setState({wrongPassword: true});
                }
              }}
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
              this.state.navigatoToHome ? (<Redirect to="/"/>) : null
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
    </div>
    )
  }
}

