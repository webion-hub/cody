import { Error } from "src/components/illustrations/illustrations"

export const getValidateEmailBadKeySettingsIsNotLogged = ({setOpenAlertDialog}) => {

  return {
    image: Error,
    title: "Errore",
    subTitle: "Loggati e prova a rinviare l'email",
    buttonLabel: "Login",
    onClick: () =>  setOpenAlertDialog("login")
  }
}