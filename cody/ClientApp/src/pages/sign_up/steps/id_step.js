
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { NextFocus } from 'src/lib/next_focus';
import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'

import { PickerWithErrorAndLabel } from 'src/components/pickers/picker_with_error_and_label';
import { DatePickerWithErrors } from 'src/components/pickers/text_fields/date_pickers/date_picker_with_errors';
import { Step2 } from 'src/components/illustrations/illustrations/illustrations';

const useStyles = makeStyles((theme) => ({
  textFieldName: {
    marginTop: theme.spacing(1)
  },
  textFieldSurname: {
    marginBottom: theme.spacing(1)
  }
}));

export default function IDData(props){
	const classes = useStyles();
  const nextFocus = new NextFocus(["username", "name", "surname"]);

  const usernameError = props.errors.usernameError || props.errors.usernameExist
  const nameError = props.errors.nameError
  const surnameError = props.errors.surnameError

  const minBirthDateError = props.errors.minBirthDateError
  const maxBirthDateError = props.errors.maxBirthDateError
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
        <PickerWithErrorAndLabel
          fadeError={props.errors.usernameExist}
          errorMessage="Username già usato!"
          leftMessage={`Tra ${FormatLengthController.set('username').min} e ${FormatLengthController.set('username').max} caratteri`}
        >
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            color="secondary"
            inputRef={nextFocus.getInput("username")}
            error={usernameError}
            fullWidth
            required
            defaultValue={props.values.username}
            onChange={e => props.onUsernameChange(e.target.value)}
            onKeyDown={nextFocus.enterPressedFocusOn("name")}          
          />
        </PickerWithErrorAndLabel>,
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
          onKeyDown={nextFocus.enterPressedFocusOn("surname")}
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
          onKeyDown={nextFocus.removeFocus}
        />,
        <DatePickerWithErrors
          generalError={birthDateError}
          minBirthDateError={minBirthDateError}
          maxBirthDateError={maxBirthDateError}
          variant="outlined"
          value={props.values.birthDate}
          onChange={props.onBirthDateChange}
        />
      ]}
    />
  );
}



