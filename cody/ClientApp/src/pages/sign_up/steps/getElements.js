import { EmailPassword } from './1_email_password/email_password_step';
import { EmailPasswordController } from './1_email_password/email_password_controller';

import { IDData } from './2_ID_data/id_step';
import { IDController } from './2_ID_data/id_controller';

import { OptionalData } from './3_optional/optional_step';

export const getElements = ({
  handleDataChange,
  data,
  errors,
}) => {
  return [
    {
      controller: new EmailPasswordController(),
      height: 452,
      element: <EmailPassword
        onEmailChange = {handleDataChange("email")}
        onPasswordChange = {handleDataChange("password")}
        onConfirmPasswordChange = {handleDataChange("confirmPassword")}
        values = {data}
        errors = {errors}
      />
    },
    {
      controller: new IDController(),
      height: 521,
      element: <IDData
        onUsernameChange = {handleDataChange("username")}
        onNameChange = {handleDataChange("name")}
        onSurnameChange = {handleDataChange("surname")}
        onBirthDateChange = {handleDataChange("birthDate")}
        values = {data}
        errors = {errors}
      />
    },  
    {
      controller: null,
      height: 409,
      element: <OptionalData
        onProfileImageChange = {handleDataChange("profileImage")}
        values = {data}
      />, 
    },
  ]
}
