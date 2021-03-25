import { Error } from 'src/components/illustrations/error';
import { User } from 'src/lib/user';

export function useValidateEmailBadKeySettings({
  setOpenAlertDialog,
}){
  
  
  return {
    image: Error,
    title: "Errore",
    subTitle: "C'è stato un errore nella convalida dell'email.",
    buttonLabel: "Rinvia email",
    onClick: () => {
      setOpenAlertDialog("close")
      User
        .sendNewVerificationEmail()
        .then(() => setOpenAlertDialog("success"))
        .catch(() => setOpenAlertDialog("error"))
    }
  }
}