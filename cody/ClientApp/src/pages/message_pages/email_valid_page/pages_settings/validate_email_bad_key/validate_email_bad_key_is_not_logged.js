import { Error } from "src/components/illustrations/illustrations/illustrations"
import { MessagePageBase } from 'src/components/bases/message_page_base';
import { EventsDispatcher } from "src/lib/events_dispatcher";

export default function ValidateEmailBadKeyNotLogged(){
  const openLoginDialog = () => {
    EventsDispatcher
      .setEvent('openLoginDialog')
      .update()
  }

  return (
    <MessagePageBase
      image={Error}
      title="Errore"
      subTitle="Loggati e prova a rinviare l'email"
      buttonLabel="Login"
      onClick={openLoginDialog}
    />
  )
}