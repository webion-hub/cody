import React from 'react';

import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useWaves } from 'src/lib/hooks/use_waves';

const useStyles = makeStyles((theme) => ({
  dialogContainer: props => ({
    [theme.breakpoints.up('sm')]: {
      transform: `translate(${theme.drawer.width / 2}px, 0px)`
    },
    background: theme.palette.background.paperSecondary,
    backgroundImage: `url("${props.waves}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  }),
  title: {
    color: theme.palette.text.secondary,
  },
  centeredButtons: {
    display: "block",
    textAlign: "center"
  }
}));

export function DialogBase(props){
  const waves = useWaves();
  const classes = useStyles({waves});

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