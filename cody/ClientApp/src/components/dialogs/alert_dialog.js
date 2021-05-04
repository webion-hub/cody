import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { DialogBase } from 'src/components/bases/dialog_base';

const useStyles = makeStyles(_ => ({
  paperClassName: {
    maxWidth: 632,
    width: "100%"
  },
  listItem: {
    paddingLeft: 0,
  }
}));

export function AlertDialog(props){
	const classes = useStyles();
 
  const handleClose = () => {
    const {onClose} = props;
    onClose(false);
  }

  const children = props.children &&
    <ListItem className={classes.listItem}>
      <ListItemText primary={props.children} />
    </ListItem>

  return(
    <DialogBase
      paperClassName={classes.paperClassName}
      title={props.title || "Si è verificato un errore"}
      open={props.open}
      onClose={handleClose}
      firstButton={
        <Button 
          onClick={handleClose}
          color="primary"
          variant="contained"
        >
          {props.buttonLabel}
        </Button>
      }
    >
      <BasePhotoText
        image={props.illustration}
        margin={1}
        items={[
          <List component="nav">
            {children}
          </List>
        ]}
      >
      </BasePhotoText>
    </DialogBase>
  )
}

AlertDialog.defaultProps = {
  buttonLabel: "Chiudi",
}