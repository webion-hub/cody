import { Error } from "src/components/illustrations/illustrations/illustrations";
import { MessagePageBase } from 'src/components/bases/message_page_base';

export default function ValidateEmailNotFound(){
  return (
    <MessagePageBase
      image={Error}
      title="Utente non trovato"
      subTitle="L'utente non è stato trovato, riprova più tardi"
      buttonLabel="Vai alla home"
      href="/"
    />
  )
}