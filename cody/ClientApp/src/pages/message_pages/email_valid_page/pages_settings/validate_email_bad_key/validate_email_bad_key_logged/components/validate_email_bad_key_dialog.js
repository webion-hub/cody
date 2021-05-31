import { DialogBase } from 'src/components/bases/others/dialog_base';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { PageController } from 'src/lib/page_controller';

export default function ValidateEmailBadKeyDialog({alertDialogStatus}){
  const alertTitle = {
    'error': "Errore",
    'success': "Email inviata"
  }[alertDialogStatus]

  const alertMessage = {
    'error': "C'è stato un errore riprova più tardi!",
    'success': "Email inviata, controlla la tua casella email!"
  }[alertDialogStatus]

  return (
    <DialogBase
      open={alertDialogStatus !== "close" && alertDialogStatus !== "loading"}
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
      title={alertTitle}
    >
      <Typography>
        {alertMessage}
      </Typography>
    </DialogBase>
  );
}
