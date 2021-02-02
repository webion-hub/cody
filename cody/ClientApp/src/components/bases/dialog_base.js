import React from 'react';

import { Dialog, Typography } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialog: {
    [theme.breakpoints.up('sm')]: {
      transform: "translate(24px, 0px)"
    },
  },
  title: {
    color: theme.palette.text.secondary,
  }
}));

export function DialogBase(props){
  const classes = useStyles();

  return(
    <Dialog
      maxWidth="xl"
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{paper: classes.dialog,}}
    >
      <DialogTitle style={{textAlign: props.titleAlign}} id="alert-dialog-title" className={classes.title}>
        {props.title}
      </DialogTitle>
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions>
        {props.firstButton}
        {props.secondButton}
      </DialogActions>
    </Dialog>
  );
}