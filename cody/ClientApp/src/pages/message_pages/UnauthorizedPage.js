import { MessagePageBase } from 'src/components/bases/message_page_base';
import { Error } from 'src/components/illustrations/illustrations/illustrations';

export const errorPageSettings = {
  image: Error,
  title: "Errore",
  subTitle: "Non hai i permessi per accedere a questa pagina.",
  buttonLabel: "Torna alla home",
  href: '/'
}

export default function UnauthorizedPage() {
  return (
    <MessagePageBase
      {...errorPageSettings}
    />
  );
}
