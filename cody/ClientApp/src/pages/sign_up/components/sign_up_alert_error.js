import React from 'react';

import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { AlertDialog } from 'src/components/dialogs/alert_dialog';
import { PageController } from 'src/lib/page_controller';

export function SignUpAlertError(props){
  const registrationErrors = props.registrationErrors;

  return (
    <AlertDialog
      open={props.open}
      onClose={() => PageController.pushAndRefresh('/sign-up')}
      items={[
        <Grid
          container
          direction="column"
        >
          {
            registrationErrors.registerError ? 
              [
                registrationErrors
                  .registerErrors.map(e => ({
                    username: <Typography variant="body2">errore inserimento username</Typography>,
                    name: <Typography variant="body2">errore inserimento nome</Typography>, 
                    surname: <Typography variant="body2">errore inserimento cognome</Typography>, 
                    email: <Typography variant="body2">errore inserimento email</Typography>,
                    password: <Typography variant="body2">errore inserimento password</Typography>,
                    birthDate: <Typography variant="body2">errore inserimento data nascita</Typography>,
                  }[e]))
              ]
              :
              null
          }
        </Grid>,
        <Typography variant="body2">
          {registrationErrors.missingFields}
        </Typography>,
        <Typography variant="body2">
          {registrationErrors.imageUploadError}
        </Typography>,
      ]}
    />
  );
}