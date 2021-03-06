import React from 'react';

import { Confirmation } from 'src/components/illustrations/confirmation';
import { MessagePageBase } from 'src/components/bases/message_page_base';

export function EmailValidPage() {
  return (
    <MessagePageBase
      image={Confirmation}
      title="Email valida"
      subTitle="La tua email è stata validata, ora puoi iniziare ad esplorare cody."
      buttonLabel="Vai alla home"
      href='/'
    />
  );
}
