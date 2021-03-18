
import React from 'react';

import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { DialogBase } from 'src/components/bases/dialog_base';

import { Error } from 'src/components/illustrations/error';

export function AlertDialog(props){
 
  const handleClose = () => {
    const {onClose} = props;
    onClose(false);
  }

  const getItems = () => {
    const items = props.items;
    const cleanItems = items.filter(item => item !== undefined && item !== null)
    const getItems = cleanItems.map((item, index) => 
      <div key={item}>
        <ListItem>
          <ListItemText primary={item} />
        </ListItem>
        <Divider />
      </div>
    );
    
    return getItems;
  }

  return(
    <DialogBase
      title="C'è stato un errore"
      open={props.open}
      onClose={handleClose}
      firstButton={
        <Button 
          onClick={handleClose}
          color="primary"
          variant="contained"
        >
          Chiudi
        </Button>
      }
    >
      <BasePhotoText
        image={Error}
        margin={1}
        items={[
          <Typography variant="h6">
            Ci sono i seguenti errori:
          </Typography>,
          <List component="nav">
            <Divider />
            {getItems()}
          </List>
        ]}
      />
    </DialogBase>
  )
}