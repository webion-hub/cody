import React from 'react';

import { Error404 } from 'src/components/illustrations/error404';
import { MessagePageBase } from 'src/components/bases/message_page_base';

export const errorPageSettings = {
  image: Error404,
  title: "Pagina non trovata",
  subTitle: "Ci scusiamo, probabilmente l'url inserita è sbagliata o non esiste più.",
  buttonLabel: "Torna alla home",
  href: '/'
}

export function Error404Page() {
  return (
    <MessagePageBase
      {...errorPageSettings}
    />
  );
}
