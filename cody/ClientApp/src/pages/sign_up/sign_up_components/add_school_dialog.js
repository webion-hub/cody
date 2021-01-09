
import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';

import { SignUpBase } from './sign_up_base'
import { NextFocus } from '../../../lib/next_focus';
import { School } from '../../../lib/school';
import { LoadingButton } from '../../../components/loading_button';

import { Graduation } from '../../../components/illustrations/graduation';

export class AddSchoolDialog extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: "",
      city: "",
      country: "",

      loading: false,
    }

    this.handleClose = this.handleClose.bind(this);

    this.nextFocus = new NextFocus(["name","city","country"]);
  }

  disableButton(){
    const emptyName = this.state.name === ""
    const emptyCity = this.state.city === ""
    const emptyCountry = this.state.country === ""

    return emptyName || emptyCity || emptyCountry;
  }
  
  handleClose(){
    const {onClose} = this.props;
    onClose(false);
  }

  handleChange = (prop) => (event) => {
    this.setState({[prop]: event.target.value});
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
                inputRef={this.nextFocus.getInput("name")} 
                fullWidth={true}      
                onChange={this.handleChange('name')}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.nextFocus.focusOn("city");
                  }              
                }}       
              />,
              <TextField
                id="school_city"
                label="Città"
                variant="outlined"
                color="secondary"
                inputRef={this.nextFocus.getInput("city")} 
                fullWidth={true}    
                onChange={this.handleChange('city')}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.nextFocus.focusOn("country");
                  }              
                }}         
              />,
              <TextField
                id="school_county"
                label="Stato"
                variant="outlined"
                color="secondary"
                inputRef={this.nextFocus.getInput("country")} 
                fullWidth={true}   
                onChange={this.handleChange('country')}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.nextFocus.removeFocus();
                  }              
                }}          
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
          <LoadingButton 
            loading={this.state.loading}
            label="Aggiungi"
            disabled={this.disableButton()}
            onClick={_ => {
              this.setState({loading: true});
              School.createNew({
                school: {
                  name: this.state.name,
                  city: this.state.city,
                  country: this.state.country,
                },
                onError: existingId => console.log("esiste"),
                onSuccess: newId => {
                  this.setState({loading: false});
                  this.handleClose();
                },
              })
            }}
          />
        </DialogActions>
      </Dialog>
    )
  }    
}