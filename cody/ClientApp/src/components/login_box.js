import React from 'react';
import { TextField } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core/';

import { Password } from './password_textfield'
import { Colors } from '../index';

import { makeStyles } from '@material-ui/core/styles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { User } from '../lib/user';


const useStyles = makeStyles({
  forgotPassword: {
    fontSize: 12
  },
});


export function LoginBox(props) {
  let _username = '';
  let _password = '2437Productions';
  
  /**
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} e 
   */
  const _updateUsername = e => {
    _username = e.target.value;
  };

  /**
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} e 
   */
  function _updatePassword(value){
    _password = value;
  };

  const classes = useStyles();

  return (
    <Box width={props.size}>
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
            onChange={_updateUsername}
          />
          <Box m={0.5}/>
          <Password
            label="Password"
            labelWidth={70}
            onChange={_updatePassword}
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
            fullWidth={true}
            endIcon={<AccountCircleRoundedIcon/>}
            onClick={() => {
              console.log(_username);
              User.tryLogin(_username, _password);
            }}
          >
            Accedi
          </Button>
          <Box mt={1}>
            <Link
              className={classes.forgotPassword}
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
  );
}
