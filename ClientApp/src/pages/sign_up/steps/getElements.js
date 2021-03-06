import { lazyLoader } from 'src/components/utilities/lazy_loader';
import { FormatController } from 'src/lib/format_controller/format_controller';

const EmailPassword = lazyLoader(() => import('./email_password_step'))
const IDData = lazyLoader(() => import('./id_step'))
const AddPhotoStep = lazyLoader(() => import('./addphoto_step'))

export const getElements = ({
  handleDataChange,
  data,
  errors,
}) => [
  {
    height: 415,
    element: 
      <EmailPassword
        suspenseHeight={327}
        onEmailChange = {handleDataChange("email")}
        onPasswordChange = {handleDataChange("password")}
        onConfirmPasswordChange = {handleDataChange("confirmPassword")}
        values = {data}
        errors = {errors}
      />,
    controller: FormatController
      .setController()
      .add('email')
      .add('password')
  },
  {
    height: 494,
    element: 
      <IDData
        suspenseHeight={406}
        onUsernameChange = {handleDataChange("username")}
        onNameChange = {handleDataChange("name")}
        onSurnameChange = {handleDataChange("surname")}
        onBirthDateChange = {handleDataChange("birthDate")}
        values = {data}
        errors = {errors}
      />,
    controller: FormatController
      .setController()
      .add('username')
      .add('name')
      .add('surname')
      .add('birthDate')
  },  
  {
    height: 397,
    element: 
      <AddPhotoStep
        suspenseHeight={309}
        onProfileImageChange = {handleDataChange("profileImage")}
        onAcceptTerms = {handleDataChange("acceptTerms")}
        values = {data}
        errors = {errors}
      />,
    controller: FormatController
      .setController()
      .add('termsAndService')
  },
]