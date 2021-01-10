
import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { Typography } from '@material-ui/core';

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
    const getItems = items.map((item, index) => 
    <Typography 
      key={index}
      variant="subtitle1"
    >
      {item}
    </Typography>
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
        onClose={this.handleClose}
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
              this.getItems()
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