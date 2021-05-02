import React from 'react';
import { Error } from 'src/components/illustrations/illustrations/illustrations';
import { User } from 'src/lib/server_calls/user';
import { MessagePageBase } from 'src/components/bases/message_page_base';
import ValidateEmailBadKeyDialog from './components/validate_email_bad_key_dialog';

export default function ValidateEmailBadKeyLogged(){
  const [alertDialogStatus, setAlertDialogStatus] = React.useState("close");

  const resendEmail = () => {      
    setAlertDialogStatus("loading")
    User
      .sendNewVerificationEmail()
      .then(() => setAlertDialogStatus("success"))
      .catch(() => setAlertDialogStatus("error"))
  }

  return (
    <>
      <MessagePageBase
        loading={alertDialogStatus === "loading"}
        image={Error}
        title="Rinvia email"
        subTitle={<>C'è stato un errore nella convalida dell'email<br/>Premi il pulsante per reinviarla</>}
        buttonLabel="Reinvia email"
        onClick={resendEmail}
      />
      <ValidateEmailBadKeyDialog
        alertDialogStatus={alertDialogStatus}
      />
    </>
  )
}