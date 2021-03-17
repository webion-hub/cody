import { EmailPassword } from '../steps/1_email_password/email_password_step';
import { EmailPasswordController } from '../steps/1_email_password/email_password_controller';

import { IDData } from '../steps/2_ID_data/id_step';
import { IDController } from '../steps/2_ID_data/id_controller';

import { OptionalData } from '../steps/3_optional/optional_step';

export const getElements = ({
  handleDataChange,
  data,
  errors,
}) => {
  return [
    {
      controller: new EmailPasswordController(),
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
      element: <OptionalData
        onProfileImageChange = {handleDataChange("profileImage")}
        values = {data}
      />, 
    },
  ]
}
