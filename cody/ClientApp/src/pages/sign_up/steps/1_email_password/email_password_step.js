
import React from 'react';

import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Password } from 'src/components/password/password_textfield';
import { PwStrengthProgress } from 'src/components/password/password_strenght_progress';
import { BasePhotoText } from 'src/components/bases/base_photo_text';
import { NextFocus } from 'src/lib/next_focus';
import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'

import { Step1 } from 'src/components/illustrations/step1';


export const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%"
  },
  password: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  }
}));

export function EmailPassword(props){
	const classes = useStyles();

  const [password, setPassword] = React.useState(props.values.password);
  const nextFocus = new NextFocus(["email", "password", "confirmPassword"]);
  
  const emailError = props.errors.emailError || props.errors.emailExist
  const passwordError = props.errors.passwordError

  const getPassword = (value) => {
    setPassword(value);

    const {onPasswordChange} = props;
    onPasswordChange(value);
  }
  
  return (
    <BasePhotoText
      image={Step1}
      bottomMargin={1}
      margin={1}
      items={[
        <Typography
          variant="body2"
          color="secondary"
        >
          Email &amp; Password
        </Typography>,
        <>
          <form className={classes.form}>
            <TextField
              id="registration_email"
              label="Email"
              variant="outlined"
              color="secondary"
              defaultValue={props.values.email}
              fullWidth
              required
              onChange={e => props.onEmailChange(e.target.value)}
              inputRef={nextFocus.getInput("email")} 
              error={emailError}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  nextFocus.focusOn("password");
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
              in={props.errors.emailExist}
            >
              <Typography
                variant="caption"
                color="error"
              >
                Email già usata!
              </Typography>
            </Fade>
          </Grid>
        </>,
        <>
          <div className={classes.password}>
            <Password
              label="Password"
              name="new_password"
              labelWidth={85}
              required
              defaultValue={props.values.password}
              onChange={getPassword}
              inputRef={nextFocus.getInput("password")} 
              error={passwordError}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  nextFocus.focusOn("confirmPassword");
                }
            }}
            />
          </div>
          <PwStrengthProgress
            password={password}
          />
          <Typography
            variant="caption"
            color="textSecondary"
          >
            {`Tra ${FormatLengthController.set('password').min} e ${FormatLengthController.set('password').max} caratteri`}
          </Typography>
        </>,
        <Password
          label="Conferma Password"
          labelWidth= {163}
          required
          defaultValue={props.values.confirmPassword}
          onChange={props.onConfirmPasswordChange}
          error={passwordError}
          inputRef={nextFocus.getInput("confirmPassword")} 
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.removeFocus()
            }
          }}
        />
        ,
      ]}
    />
  );
}




 