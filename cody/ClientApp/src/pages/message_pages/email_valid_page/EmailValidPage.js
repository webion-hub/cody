import React, { useEffect } from 'react';

import { MessagePageBase } from 'src/components/bases/message_page_base';
import { getValidateEmailBadKeySettingsIsLogged } from './pages_settings/validate_email_bad_key_settings_is_logged';
import { getValidateEmailBadKeySettingsIsNotLogged } from './pages_settings/validate_email_bad_key_settings_is_not_logged';
import { validateEmailNotFoundSettings } from './pages_settings/validate_email_not_found_settings';
import { validateEmailOkSettings } from './pages_settings/validate_email_ok_settings';
import { errorPageSettings } from '../Error404Page';
import { DialogBase } from 'src/components/bases/dialog_base';

import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PageController } from 'src/lib/page_controller';
import { LoginBox } from 'src/pages/login/components/login_box';
import { UserContext } from 'src/components/user_controller_context/user_controller_context';

export const useStyles = makeStyles((theme) => ({
  paperClassName: {
    maxWidth: 632,
    width: "100%"
  }
}));

export default function EmailValidPage() {
	const classes = useStyles();
  const [contentSetting, setContentSetting] = React.useState(errorPageSettings);
  const [openAlertDialog, setOpenAlertDialog] = React.useState("close");
  const { isLogged } = React.useContext(UserContext);  
  
  const validateEmailBadKeySettingsIsLogged = getValidateEmailBadKeySettingsIsLogged({
    setOpenAlertDialog: setOpenAlertDialog,
  })
  const validateEmailBadKeySettingsIsNotLogged = getValidateEmailBadKeySettingsIsNotLogged({
    setOpenAlertDialog: setOpenAlertDialog,
  })

  useEffect(() => {
    const hash = window.location.hash
    const value = hash.replace('#', '')

    setContentByHash(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.hash, isLogged])

  const setContentByHash = (hash) => {
    const validateEmailBadKeySettings = isLogged ? 
      validateEmailBadKeySettingsIsLogged : validateEmailBadKeySettingsIsNotLogged

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
        loading={openAlertDialog === "loading"}
        {...contentSetting}
      />
      <DialogBase
        open={openAlertDialog == "login"}
        onClose={() => setOpenAlertDialog("close")}
        paperClassName={classes.paperClassName}
      >
        <LoginBox
          onSuccess={() => setOpenAlertDialog("close")}
        />
      </DialogBase>
      <DialogBase
        open={openAlertDialog == "error" || openAlertDialog == "success" }
        onClose={(event) => PageController.push('/', event)}
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