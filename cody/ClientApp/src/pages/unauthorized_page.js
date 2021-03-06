import React from 'react';

import { Error } from 'src/components/illustrations/error';
import { MessagePageBase } from 'src/components/bases/message_page_base';

export function UnauthorizedPage() {
  return (
    <MessagePageBase
      image={Error}
      title="Errore"
      subTitle="Non hai i permessi per accedere a questa pagina"
      buttonLabel="Torna alla home"
      href='/'
    />
  );
}
