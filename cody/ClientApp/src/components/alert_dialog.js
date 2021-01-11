
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

import { SignUpBase } from '../pages/sign_up/sign_up_components/sign_up_base'

import { Error } from './illustrations/error';

import { Base, getWindowDimensions } from '../index';

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
    const screenWidth = getWindowDimensions().width;
    const isImageBigger = Base.formImageWidth > screenWidth;
    const isFormBigger = Base.formWidth > screenWidth;

    const imageWidth = isImageBigger ?
      screenWidth - 5:
      Base.formImageWidth;

    const formWidth = isFormBigger ? 
      screenWidth - 5 : 
      Base.formWidth;

    return(
      <Dialog
        maxWidth="xl"
        open={this.props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"C'è stato un errore"}</DialogTitle>
        <DialogContent>
          <SignUpBase
            image={<Error size={imageWidth}/>}
            formWidth={formWidth}
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