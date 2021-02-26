import React from 'react';

import { Confirmation } from 'src/components/illustrations/confirmation';
import { MessagePageBase } from 'src/components/bases/message_page_base';

import history from 'src/history'

export function EmailValid() {
  return (
    <MessagePageBase
      image={Confirmation}
      title="Email valida"
      subTitle="La tua email è stata validata, ora puoi iniziare ad esplorare cody."
      buttonLabel="Vai alla home"
      onClick={() => history.push('/')}
    />
  );
}
