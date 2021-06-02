import { Confirmation } from "src/components/illustrations/illustrations/illustrations";
import { MessagePageBase } from 'src/components/bases/layouts/message_page_base';

export default function ValidateEmailOk(){
  return (
    <MessagePageBase
      image={Confirmation}
      title="Email valida"
      subTitle="La tua email è stata validata, ora puoi iniziare ad esplorare cody."
      buttonLabel="Vai alla home"
      href="/"
    />
  )
}