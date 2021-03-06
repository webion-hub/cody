
import { Typography } from '@material-ui/core';

import { Password } from 'src/components/textfields/password';
import { BasePhotoText } from 'src/components/bases/layouts/base_photo_text';
import { NextFocus } from 'src/lib/next_focus';
import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'

import { PickerWithErrorAndLabel } from 'src/components/textfields/picker_with_error_and_label';
import { TextFieldWrappedWithForm } from 'src/components/textfields/text_field_wrapped_with_form';
import { PasswordWithStrength } from 'src/components/textfields/password_with_strength/password_with_strength';
import { Step1 } from 'src/components/illustrations/illustrations/illustrations';


export default function EmailPassword(props){
  const nextFocus = new NextFocus(["email", "password", "confirmPassword"]);
  
  const emailError = props.errors.emailError || props.errors.emailExist
  const passwordError = props.errors.passwordError
  
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
        <PickerWithErrorAndLabel
          errorMessage="Email già usata!"
          fadeError={props.errors.emailExist}
        >
          <TextFieldWrappedWithForm
            id="registration_email"
            label="Email"
            variant="filled"
            color="secondary"
            defaultValue={props.values.email}
            fullWidth
            required
            onChange={e => props.onEmailChange(e.target.value)}
            inputRef={nextFocus.getInput("email")} 
            error={emailError}
            onKeyDown={nextFocus.enterPressedFocusOn("password")}
          />
        </PickerWithErrorAndLabel>,
        <PickerWithErrorAndLabel
          leftMessage={`Tra ${FormatLengthController.set('password').min} e ${FormatLengthController.set('password').max} caratteri`}
        >
          <PasswordWithStrength
            label="Password"
            name="new_password"
            required
            defaultValue={props.values.password}
            onChange={props.onPasswordChange}
            inputRef={nextFocus.getInput("password")} 
            error={passwordError}
            onKeyDown={nextFocus.enterPressedFocusOn("confirmPassword")}
          />
        </PickerWithErrorAndLabel>,
        <Password
          label="Conferma Password"
          required
          defaultValue={props.values.confirmPassword}
          onChange={props.onConfirmPasswordChange}
          error={passwordError}
          inputRef={nextFocus.getInput("confirmPassword")} 
          onKeyDown={nextFocus.removeFocus}
        />
        ,
      ]}
    />
  );
}