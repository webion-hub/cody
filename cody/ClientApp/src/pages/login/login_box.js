import React from 'react';

import { TextField } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Password } from 'src/components/password/password_textfield';
import { LoadingButton } from 'src/components/buttons/loading_button';
import { NextFocus } from 'src/lib/next_focus';
import  { ForgotPasswordDialog } from './forgot_pw_dialog'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { UserContext } from 'src/components/user_controller_context';
import { User } from 'src/lib/user';

export const useStyles = makeStyles((theme) => ({
  usernameTextField: {
    marginBottom: theme.spacing(1)
  },
  forgotPasswordLink: {
    fontSize: 12,
    marginTop: theme.spacing(1)
  }
}));

export function LoginBox(){
	const classes = useStyles();
  const { setLogged } = React.useContext(UserContext);

  const [data, setData] = React.useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    wrongUsername: false,
    wrongPassword: false,
  });   
  const [rememberMe, setRememberMe] = React.useState(false);   
  const [loading, setLoading] = React.useState(false);   
  const [openForgotPw, setOpenForgotPw] = React.useState(false);   

  const nextFocus = new NextFocus(["username","password"]);

  const _maybeLogin = () => {
    setErrors({
      wrongPassword: false,
      wrongUsername: false,
    })

    if (!data.username)
      setErrors({
        ...errors,
        wrongUsername: true,
      })

    if (!data.password)
      setErrors({
        ...errors,
        wrongPassword: true,
      })

    if (!data.username || !data.password)
      return;

    setLoading(true);
    _tryLogin();
  }


  const _tryLogin = async () => {
    await User.tryLogin({
      userInfo: data,
      
      onSuccess: _ => setLogged(true),
      onUserNotFound: _ => {
        setErrors({...errors, wrongUsername: true})
        setLoading(false);
      },
      onPasswordMismatch: _ => {
        setErrors({...errors, wrongPassword: true})
        setLoading(false);
      },
    })
  }

  const _updateUsername = e => {
    setData({
      ...data,
      username: e.target.value,
    })
  }

  const _updatePassword = (value) => {
    setData({
      ...data,
      password: value,
    })
  }

  const _updateRememberMe = () =>  {
    setRememberMe(!rememberMe)
  }

  return(
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
          className={classes.usernameTextField}
          id="username"
          label="Username"
          name="login_username"
          variant="outlined"
          color="secondary"
          fullWidth
          onChange={_updateUsername}
          error={errors.wrongUsername}
          inputRef={nextFocus.getInput("username")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("password");
            }
        }}
        />
        <Password
          label="Password"
          name="login_password"
          labelWidth={70}
          onChange={_updatePassword}
          inputRef={nextFocus.getInput("password")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              _maybeLogin();
              nextFocus.removeFocus();
            }
        }}
          error={errors.wrongPassword}
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
                onChange={_updateRememberMe}
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
          loading={loading}
          fullWidth
          endIcon={<AccountCircleRoundedIcon/>}
          onClick={_ => {
            _maybeLogin()
          }}
          label="Accedi"
        />
        <Link
          className={classes.forgotPasswordLink}
          component="button"
          variant="body2"
          color="secondary"
          onClick={() => setOpenForgotPw(true)}
        >
          Password dimenticata?
        </Link>
        <ForgotPasswordDialog
          open={openForgotPw}
          onClose={() => setOpenForgotPw(false)}
        />
      </Grid>
    </Grid>
  )
}