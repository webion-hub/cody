
import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';

import { BasePhotoText } from './base_photo_text'

import { Error } from './illustrations/error';

import { Form } from '../lib/default_values/sizes/form_size';

export class AlertDialog extends Component {
  constructor(props){
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose(){
    const {onClose} = this.props;
    onClose(false);
  }

  getItems(){
    const items = this.props.items;
    const cleanItems = items.filter(item => item !== undefined && item !== null)
    const getItems = cleanItems.map((item, index) => 
      <div key={index}>
        <ListItem>
          <ListItemText primary={item} />
        </ListItem>
        <Divider />
      </div>
    );
    
    return getItems;
  }

  render(){
    return(
      <Dialog
        maxWidth="xl"
        open={this.props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"C'è stato un errore"}</DialogTitle>
        <DialogContent>
          <BasePhotoText
            image={<Error size={Form.imageWidth}/>}
            formWidth={Form.width}
            margin={1}
            items={[
              <Typography variant="h6">
                Ci sono i seguenti errori:
              </Typography>,
              <List component="nav">
                <Divider />
                {this.getItems()}
              </List>
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={this.handleClose}
            color="primary"
            variant="contained"
          >
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}