
import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { BasePhotoText } from '../../../components/bases/base_photo_text'
import { DialogBase } from '../../../components/bases/dialog_base'
import { NextFocus } from '../../../lib/next_focus';
import { School } from '../../../lib/school';
import { LoadingButton } from '../../../components/buttons/loading_button';
 
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';

import { Graduation } from '../../../components/illustrations/graduation';
import { Form } from '../../../lib/default_values/sizes/form_size';

export class AddSchoolDialog extends Component {
  constructor(props){
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.passSchool = this.passSchool.bind(this);

    this.state = {
      id: null,
      name: "",
      city: "",
      country: "",

      loading: false,
      error: false,
    }    

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

  tryAddSchool(){
    this.setState({
      error: false,
      loading: true,
    })
    School.createNew({
      school: {
        name: this.state.name,
        city: this.state.city,
        country: this.state.country,
      },
      onError: existingId => {
        this.setState({
          error: true,
          loading: false,
        })
      },
      onSuccess: newId => {
        this.setState({
          loading: false,
          id: newId,
        });
        this.passSchool();
        this.handleClose();
      },
    })
  }

  passSchool(){
    const {school} = this.props;
    school({
      id: this.state.id,
      name: this.state.name,
      city: this.state.city,
      country: this.state.country,
    }); 
  }

  render(){
    return(
      <DialogBase
        open={this.props.open}
        onClose={this.handleClose}
        title="Aggiungi il tuo istituto"
        firstButton={
          <Button
            onClick={this.handleClose}
            color="secondary"
            disabled={this.state.loading}
          >
            Chiudi
          </Button>
        }
        secondButton={
          <LoadingButton
            loading={this.state.loading}
            label="Aggiungi"
            disabled={this.disableButton()}
            onClick={_ => {
              this.tryAddSchool();
            }}
          />
        }
      >
        <BasePhotoText
          image={<Graduation size={Form.imageWidth}/>}
          formWidth={Form.width}
          margin={1}
          items={[
            <TextField
              id="school_name"
              label="Nome Istituto"
              variant="outlined"
              color="secondary"
              inputRef={this.nextFocus.getInput("name")} 
              fullWidth={true}   
              error={this.state.error}
              onChange={this.handleChange('name')}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.nextFocus.focusOn("city");
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SchoolRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />,
            <TextField
              id="school_city"
              label="Città"
              variant="outlined"
              color="secondary"
              inputRef={this.nextFocus.getInput("city")} 
              fullWidth={true}   
              error={this.state.error} 
              onChange={this.handleChange('city')}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.nextFocus.focusOn("country");
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCityRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />,
            <Box>
              <TextField
                id="school_county"
                label="Stato"
                variant="outlined"
                color="secondary"
                inputRef={this.nextFocus.getInput("country")}
                fullWidth={true}
                error={this.state.error}
                onChange={this.handleChange('country')}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.nextFocus.removeFocus();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Fade
                in={this.state.error}
              >
                <Typography
                  variant="caption"
                  color="error"
                >
                  Scuola già inserita!
                </Typography>
              </Fade>
            </Box>
          ]}
        />
      </DialogBase>
    )
  }
}