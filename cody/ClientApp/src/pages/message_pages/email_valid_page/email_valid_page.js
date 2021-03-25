import React, { useEffect } from 'react';

import { MessagePageBase } from 'src/components/bases/message_page_base';
import { useValidateEmailBadKeySettings } from './pages_settings/validate_email_bad_key_settings';
import { validateEmailNotFoundSettings } from './pages_settings/validate_email_not_found_settings';
import { validateEmailOkSettings } from './pages_settings/validate_email_ok_settings';
import { errorPageSettings } from '../error404_page';
import { DialogBase } from 'src/components/bases/dialog_base';

import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { PageController } from 'src/lib/page_controller';

export function EmailValidPage() {
  const [contentSetting, setContentSetting] = React.useState(errorPageSettings);
  const [openAlertDialog, setOpenAlertDialog] = React.useState("close");
  const validateEmailBadKeySettings = useValidateEmailBadKeySettings({
    setOpenAlertDialog: setOpenAlertDialog
  })

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

  const getDialogTitle = () => {
    switch (openAlertDialog) {
      case "error":
        return "Errore"
      case "success":
        return "Email inviata"
    }
  }

  const getDialogDescription = () => {
    switch (openAlertDialog) {
      case "error":
        return "C'è stato un errore riprova più tardi!"
      case "success":
        return "Email inviata, controlla la tua casella email!"
    }
  }


  return (
    <>
      <MessagePageBase
        {...contentSetting}
      />
      <DialogBase
        open={openAlertDialog !== "close"}
        onClose={() => setOpenAlertDialog("close")}
        firstButton={
          <Button 
            color="primary"
            variant="contained"
            href='/'
            onClick={(event) => PageController.push('/', event)}
          >
            Vai alla home
          </Button>
        }
        title={getDialogTitle()}
      >
        <Typography>
          {getDialogDescription()}
        </Typography>
      </DialogBase>
    </>
  );
}
