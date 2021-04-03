import React from 'react';

import { Snackbar } from "@material-ui/core"
import { Alert } from './alert';

export function SnackbarAlert(props){
  return (
    <Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={props.open} 
      autoHideDuration={6000} 
      onClose={props.onClose}
    >
      <Alert onClose={props.onClose} severity={props.severity}>
        {props.children}
      </Alert>
    </Snackbar>
  )
}