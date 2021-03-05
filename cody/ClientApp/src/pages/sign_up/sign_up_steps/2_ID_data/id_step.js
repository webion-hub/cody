
import React from 'react';

import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { DatePicker } from 'src/components/pickers/text_fields/date_picker';
import { NextFocus } from 'src/lib/next_focus';

import { Step2 } from 'src/components/illustrations/step2';

export const useStyles = makeStyles((theme) => ({
  textFieldName: {
    marginTop: theme.spacing(1)
  },
  textFieldSurname: {
    marginBottom: theme.spacing(1)
  }
}));

export function IDData(props){
	const classes = useStyles();
  const nextFocus = new NextFocus(["username", "name", "surname"]);

  const usernameError = props.errors.usernameError || props.errors.usernameExist
  const nameError = props.errors.nameError
  const surnameError = props.errors.surnameError
  const birthDateError = props.errors.birthDateError

  return (
    <BasePhotoText
      image={Step2}
      margin={1}
      bottomMargin={2}
      items={[
        <Typography
          variant="body2"
          color="secondary"
        >
          Come ti chiami?
        </Typography>,
          <>
            <TextField
                id="username"
                label="Username"
                variant="outlined"
                color="secondary"
                inputRef={nextFocus.getInput("username")}
                fullWidth
                required
                defaultValue={props.values.username}
                onChange={e => props.onUsernameChange(e.target.value)}
                error={usernameError}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    nextFocus.focusOn("name");
                  }
               }}  
            />
            <Grid
              container
              direction="row"
              justify="space-between"
            >
              <Typography
                variant="caption"
                color="textSecondary"
              >
                Tra 4 e 28 caratteri
              </Typography>
              <Fade
                in={props.errors.usernameExist}
              >
                <Typography
                  variant="caption"
                  color="error"
                >
                  Username già usato!
                </Typography>
              </Fade>
            </Grid>
          </>,
        <TextField
          className={classes.textFieldName}
          id="name"
          label="Nome"
          variant="outlined"
          color="secondary"
          inputRef={nextFocus.getInput("name")} 
          fullWidth
          required
          defaultValue={props.values.name}
          onChange={e => props.onNameChange(e.target.value)}
          error={nameError}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.focusOn("surname");
            }
         }}
        />,
        <TextField
          className={classes.textFieldSurname}
          id="surname"
          label="Cognome"
          variant="outlined"
          color="secondary"
          inputRef={nextFocus.getInput("surname")} 
          fullWidth
          required
          defaultValue={props.values.surname}
          onChange={e => props.onSurnameChange(e.target.value)}
          error={surnameError}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextFocus.removeFocus();
            }
         }}
        />,
        <DatePicker
          error={birthDateError}
          variant="outlined"
          value={props.values.birthDate}
          onChange={props.onBirthDateChange}
        />
      ]}
    />
  );
}



