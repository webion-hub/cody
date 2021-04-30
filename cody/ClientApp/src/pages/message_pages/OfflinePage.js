import React from 'react';

import { MessagePageBase } from 'src/components/bases/message_page_base';
import { NetworkError } from 'src/components/illustrations/illustrations';

export const errorPageSettings = {
  image: NetworkError,
  title: "Connessione assente",
  subTitle: "Sei offline, controlla la tua connessione a internet.",
}

export default function OfflinePage() {
  return (
    <MessagePageBase
      {...errorPageSettings}
    />
  );
}
