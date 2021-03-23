import React from 'react';

import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useBackgroundWaves } from 'src/lib/hooks/use_background_waves';


const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    [theme.breakpoints.up('sm')]: {
      transform: `translate(${theme.drawer.width / 2}px, 0px)`
    },
  },
  title: {
    color: theme.palette.text.secondary,
  },
  centeredButtons: {
    display: "block",
    textAlign: "center"
  }
}));

export function DialogBase(props){
  const classWithWavedBackground = useBackgroundWaves();
  const classes = useStyles();

  const areButtons = props.firstButton || props.secondButton
  const buttons = areButtons ?      
      <DialogActions className={props.centeredButtons ? classes.centeredButtons : ""}>
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
        paper: `${classWithWavedBackground} ${classes.dialogContainer}`
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