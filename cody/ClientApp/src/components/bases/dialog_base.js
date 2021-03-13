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

  const areButtons = props.firstButton || props.secondButton
  const buttons = areButtons ?
    <DialogActions>
      {props.firstButton}
      {props.secondButton}
    </DialogActions>
    :
    null

  const dialogTitle = props.title? 
    <DialogTitle
      style={{
        textAlign: props.titleAlign
      }} 
      className={classes.title}
    >
      {props.title}
    </DialogTitle>
    :
    null

  return(
    <Dialog
      maxWidth="xl"
      open={props.open}
      onClose={props.onClose}
      classes={{
        paper: classes.dialogContainer
      }}
    >
      {dialogTitle}
      <DialogContent className={props.className}>
        {props.children}
      </DialogContent>
      {buttons}
    </Dialog>
  );
}