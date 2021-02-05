
import React, {Component} from 'react';


import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { DatePicker } from 'src/components/pickers/text_fields/date_picker';
import { NextFocus } from 'src/lib/next_focus';

import { Step2 } from 'src/components/illustrations/step2';

export class IDData extends Component{

  constructor(props) {
    super(props);
    this.getDate = this.getDate.bind(this);
    
    this.state = {
      username: this.props.values.username,
      name: this.props.values.name,
      surname: this.props.values.surname,
      birthDate: this.props.values.birthDate,
    }

    this.nextFocus = new NextFocus(["username", "name", "surname"]);
  }

  getUsername = (event) => {
    this.setState({username: event.target.value });  
    const {username} = this.props;
    username(event.target.value); 
  };

  getName = (event) => {
    this.setState({name: event.target.value });
    const {name} = this.props;
    name(event.target.value);
  };

  getSurname = (event) => {
    this.setState({surname: event.target.value });  
    const {surname} = this.props;
    surname(event.target.value);  
  };

  getDate(value){
    this.setState({birthDate: value});
    const {birthDate} = this.props;
    birthDate(value);
  }

  render(){
    return (
      <BasePhotoText
        image={<Step2 size={this.props.imageWidth}/>}
        formWidth={this.props.formWidth}
        margin={1}
        bottomMargin={2}
        items={[
          <Typography
            variant="body2"
            color="secondary"
          >
            Come ti chiami?
          </Typography>,
            <Box>
              <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  color="secondary"
                  inputRef={this.nextFocus.getInput("username")}
                  fullWidth={true}
                  required={true}
                  value={this.state.username}
                  onChange={this.getUsername}
                  error={
                    this.props.errors.username 
                    || this.props.errors.usernameExist
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      this.nextFocus.focusOn("name");
                    }
                 }}  
              />
              <Grid
                container
                direction="row"
                justify="space-between"
              >
                <Typography
                  variant="caption"
                  color="textSecondary"
                >
                  Tra 4 e 28 caratteri
                </Typography>
                <Fade
                  in={this.props.errors.usernameExist}
                >
                  <Typography
                    variant="caption"
                    color="error"
                  >
                    Username già usato!
                  </Typography>
                </Fade>
              </Grid>
            </Box>,
          <Box m={1.5}/>,
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            color="secondary"
            inputRef={this.nextFocus.getInput("name")} 
            fullWidth={true}
            required={true}
            value={this.state.name}
            onChange={this.getName}
            error={this.props.errors.name}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.nextFocus.focusOn("surname");
              }
           }}
          />,
          <TextField
            id="surname"
            label="Cognome"
            variant="outlined"
            color="secondary"
            inputRef={this.nextFocus.getInput("surname")} 
            fullWidth={true}
            required={true}
            value={this.state.surname}
            onChange={this.getSurname}
            error={this.props.errors.surname}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.nextFocus.removeFocus();
              }
           }}
          />,
          <Box m={1}/>,
          <DatePicker
            error={this.props.errors.birthDate}
            variant="outlined"
            value={this.props.values.birthDate}
            onChange={this.getDate}
          />
        ]}
      />
    );
  }
}



