
import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';

import { SignUpBase } from '../sign_up_base'

import { Graduation } from '../../../components/illustrations/graduation';

export class AddSchoolDialog extends Component {
  constructor(props){
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose(){
    const {onClose} = this.props;
    onClose(false);
  }

  render(){
    return(
      <Dialog
        maxWidth="xl"
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Aggiungi il tuo istituto"}</DialogTitle>
        <DialogContent>
          <SignUpBase
            image={<Graduation size={this.props.imageWidth}/>}
            formWidth={this.props.formWidth}
            margin={1}
            items={[
              <TextField
                id="school_name"
                label="Nome Istituto"
                variant="outlined"
                color="secondary"
                fullWidth={true}           
              />,
              <TextField
                id="school_city"
                label="Città"
                variant="outlined"
                color="secondary"
                fullWidth={true}           
              />,
              <TextField
                id="school_county"
                label="Stato"
                variant="outlined"
                color="secondary"
                fullWidth={true}           
              />,
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={this.handleClose} 
            color="secondary"
          >
            Chiudi
          </Button>
          <Button 
            onClick={this.handleClose} 
            color="primary"
            variant="contained" 
            autoFocus
          >
            Aggiungi
          </Button>
        </DialogActions>
      </Dialog>
    )
  }    
}