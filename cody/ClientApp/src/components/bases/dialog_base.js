import React from 'react';

import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    [theme.breakpoints.up('sm')]: {
      transform: `translate(${theme.drawer.width / 2}px, 0px)`
    },
  },
  title: {
    color: theme.palette.text.secondary,
  }
}));

export function DialogBase(props){
  const classes = useStyles();

  const buttons = 
    <>
      {props.firstButton}
      {props.secondButton}
    </>

  return(
    <Dialog
      maxWidth="xl"
      open={props.open}
      onClose={props.onClose}
      classes={{
        paper: classes.dialogContainer
      }}
    >
      <DialogTitle
        style={{
          textAlign: props.titleAlign
        }} 
        className={classes.title}
      >
        {props.title}
      </DialogTitle>
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions>
        {buttons}
      </DialogActions>
    </Dialog>
  );
}