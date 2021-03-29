import { EmailPassword } from './1_email_password/email_password_step';
import { EmailPasswordController } from './1_email_password/email_password_controller';

import { IDData } from './2_ID_data/id_step';
import { IDController } from './2_ID_data/id_controller';

import { AddPhotoStep } from './3_optional/addphoto_step';
import { TermsAndServiceController } from './3_optional/terms_and_service_controller';

export const getElements = ({
  handleDataChange,
  data,
  errors,
}) => [
  {
    controller: new EmailPasswordController(),
    height: 415,
    element: 
      <EmailPassword
        onEmailChange = {handleDataChange("email")}
        onPasswordChange = {handleDataChange("password")}
        onConfirmPasswordChange = {handleDataChange("confirmPassword")}
        values = {data}
        errors = {errors}
      />
  },
  {
    controller: new IDController(),
    height: 483,
    element: 
      <IDData
        onUsernameChange = {handleDataChange("username")}
        onNameChange = {handleDataChange("name")}
        onSurnameChange = {handleDataChange("surname")}
        onBirthDateChange = {handleDataChange("birthDate")}
        values = {data}
        errors = {errors}
      />
  },  
  {
    controller: new TermsAndServiceController,
    height: 397,
    element: 
      <AddPhotoStep
        onProfileImageChange = {handleDataChange("profileImage")}
        onAcceptTerms = {handleDataChange("acceptTerms")}
        values = {data}
        errors = {errors}
      />
  },
]
