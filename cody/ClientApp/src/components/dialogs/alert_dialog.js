
import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { DialogBase } from 'src/components/bases/dialog_base';

import { Error } from 'src/components/illustrations/error';

import { Form } from 'src/lib/default_values/sizes/form_size';

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
      <div key={item}>
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
      <DialogBase
        title="C'è stato un errore"
        open={this.props.open}
        onClose={this.handleClose}
        firstButton={
          <Button 
            onClick={this.handleClose}
            color="primary"
            variant="contained"
          >
            Chiudi
          </Button>
        }
      >
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
      </DialogBase>
    )
  }
}