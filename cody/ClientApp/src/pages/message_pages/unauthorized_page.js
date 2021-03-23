import React from 'react';

import { Error } from 'src/components/illustrations/error';
import { MessagePageBase } from 'src/components/bases/message_page_base';

export const errorPageSettings = {
  image: Error,
  title: "Errore",
  subTitle: "Non hai i permessi per accedere a questa pagina.",
  buttonLabel: "Torna alla home",
  href: '/'
}

export function UnauthorizedPage() {
  return (
    <MessagePageBase
      {...errorPageSettings}
    />
  );
}
