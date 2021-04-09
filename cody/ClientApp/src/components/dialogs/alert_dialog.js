
import React from 'react';

import { Button } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { DialogBase } from 'src/components/bases/dialog_base';

import { Error } from 'src/components/illustrations/error';

export const useStyles = makeStyles((theme) => ({
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

  const getItems = () => {
    const items = props.items;
    if(items !== null)
      return;

    const cleanItems = items.filter(item => item !== undefined && item !== null)
    const getItems = 
      cleanItems.map((item, index) => 
        <div key={index}>
          <ListItem className={classes.listItem}>
            <ListItemText primary={item} />
          </ListItem>
        </div>
      );
    
    return getItems;
  }

  const children = props.children &&
    <ListItem className={classes.listItem}>
      <ListItemText primary={props.children} />
    </ListItem>

  return(
    <DialogBase
      paperClassName={classes.paperClassName}
      title="C'è stato un errore"
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
        image={Error}
        margin={1}
        items={[
          <List component="nav">
            {getItems()}
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