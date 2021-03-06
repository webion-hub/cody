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
  title: props => ({
    color: theme.palette.text.secondary,
    textAlign: props.titleAlign
  }),
  centeredButtons: {
    display: "block",
    textAlign: "center",
  },
  buttons: {
    padding: theme.spacing(2)
  },
  content: {
    overflowX: "hidden"
  }
}));

export function DialogBase(props){
  const classWithWavedBackground = useBackgroundWaves();
  const titleAlign = props.titleAlign
  const classes = useStyles({titleAlign});

  const areButtons = props.firstButton || props.secondButton
  const buttonsClassName = props.centeredButtons && classes.centeredButtons
  const paperClassNames = 
    `${classWithWavedBackground} ${classes.dialogContainer} ${props.paperClassName}`

  const buttons = areButtons &&      
    <DialogActions className={`${buttonsClassName} ${classes.buttons}`}>
      {props.firstButton}
      {props.secondButton}
    </DialogActions>

  const dialogTitle = props.title && 
    <DialogTitle
      className={classes.title}
    >
      {props.title}
    </DialogTitle>

  return(
    <Dialog
      maxWidth="xl"
      open={props.open}
      onClose={props.onClose}
      fullScreen={props.fullScreen}
      classes={{
        paper: paperClassNames
      }}
    >
      {dialogTitle}
      <DialogContent 
        className={`${props.className} ${classes.content}`}
      >
        {props.children}
      </DialogContent>
      {buttons}
    </Dialog>
  );
}