import { Error } from 'src/components/illustrations/error';
import { User } from 'src/lib/server_calls/user';

export const getValidateEmailBadKeySettingsIsLogged = ({setOpenAlertDialog}) => {
  const resendEmail = () => {      
    setOpenAlertDialog("loading")
    User
      .sendNewVerificationEmail()
      .then(() => {
        setOpenAlertDialog("success")
      })
      .catch(() => {
        setOpenAlertDialog("error")
      })
  }

  return {
    image: Error,
    title: "Rinvia email",
    subTitle: <>C'è stato un errore nella convalida dell'email<br/>Premi il pulsante per reinviarla</>,
    buttonLabel: "Reinvia email",
    onClick: () =>  resendEmail()
  }
}