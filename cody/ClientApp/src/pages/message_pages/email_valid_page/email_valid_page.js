import React, { useEffect } from 'react';

import { MessagePageBase } from 'src/components/bases/message_page_base';
import { validateEmailBadKeySettings } from './pages_settings/validate_email_bad_key_settings';
import { validateEmailNotFoundSettings } from './pages_settings/validate_email_not_found_settings';
import { validateEmailOkSettings } from './pages_settings/validate_email_ok_settings';
import { errorPageSettings } from '../error404_page';

export function EmailValidPage() {
  const [contentSetting, setContentSetting] = React.useState(errorPageSettings);

  useEffect(() => {
    const hash = window.location.hash
    const value = hash.replace('#', '')

    setContentByHash(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.hash])

  const setContentByHash = (hash) => {
    const action = {
      'ok': () => setContentSetting(validateEmailOkSettings),
      'not-found': () => setContentSetting(validateEmailNotFoundSettings),
      'bad-key': () => setContentSetting(validateEmailBadKeySettings),
    }[hash];

    action ? 
      action() : setContentSetting(errorPageSettings); 
  }

  return (
    <MessagePageBase
      {...contentSetting}
    />
  );
}
