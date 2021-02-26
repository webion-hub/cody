import React from 'react';

import { Error404 } from 'src/components/illustrations/error404';
import { MessagePageBase } from 'src/components/bases/message_page_base';

import history from 'src/history'

export function UnauthorizedPage() {
  return (
    <MessagePageBase
      image={Error404}
      title="Errore"
      subTitle="Non hai i permessi per accedere a questa pagina"
      buttonLabel="Torna alla home"
      onClick={() => history.push('/')}
    />
  );
}
