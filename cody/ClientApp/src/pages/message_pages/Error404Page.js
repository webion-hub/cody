import React from 'react';

import { MessagePageBase } from 'src/components/bases/message_page_base';
import { Error404 } from 'src/components/illustrations/illustrations/illustrations';

export const errorPageSettings = {
  image: Error404,
  title: "Pagina non trovata",
  subTitle: "Ci scusiamo, probabilmente l'url inserita è sbagliata o non esiste più.",
  buttonLabel: "Torna alla home",
  href: '/'
}

export default function Error404Page() {
  return (
    <MessagePageBase
      {...errorPageSettings}
    />
  );
}
