
import React, {Component} from 'react';


import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Colors } from '../../../index';
import { SignUpBase } from '../sign_up_components/sign_up_base'
import { DatePicker } from '../../../components/date_picker';
import { NextFocus } from '../../../lib/next_focus';

import { FormatControl } from '../../../lib/format_control/format_control';
import { IDControl } from '../../../lib/format_control/id_control';

import { Step2 } from '../../../components/illustrations/step2';

export class IDData extends Component{

  constructor(props) {
    super(props);
    this.getDate = this.getDate.bind(this);

    this.formatControl = new FormatControl();
    this.idControl = new IDControl();

    this.state = {
      username: this.props.values.username,
      name: this.props.values.name,
      surname: this.props.values.surname,
      birthDate: this.props.values.birthDate,
    }

    const areErrorsCheck = this.formatControl.areErrorsId(
      this.state.username,
      this.state.name, 
      this.state.surname);
    const {areErrors} = this.props;
    areErrors(areErrorsCheck);

    this.nextFocus = new NextFocus(["username", "name", "surname"]);
  }

  

  getUsername = (event) => {
    this.setState({username: event.target.value });
    const {areErrors} = this.props;
    const {username} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsId(
      event.target.value,
      this.state.name, 
      this.state.surname);

    areErrors(areErrorsCheck);
    username(event.target.value);
  };

  getName = (event) => {
    this.setState({name: event.target.value });
    const {areErrors} = this.props;
    const {name} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsId(
      this.state.username,
      event.target.value, 
      this.state.surname);

    areErrors(areErrorsCheck);
    name(event.target.value);
  };

  getSurname = (event) => {
    this.setState({surname: event.target.value });
    const {areErrors} = this.props;
    const {surname} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsId(
      this.state.username,
      this.state.name, 
      event.target.value);

    areErrors(areErrorsCheck);
    surname(event.target.value);
  };

  getDate(value){
    this.setState({birthDate: value});
    const {date} = this.props;

    date(value);
  }

  render(){
    return (
      <SignUpBase
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
                  value={this.props.values.username}
                  onChange={this.getUsername}
                  error={
                    this.props.checkErrors && 
                    this.idControl.isWrongUsername(this.state.username)
                  }  
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      this.nextFocus.focusOn("name");
                    }              
                 }}  
              />
              <Typography
                variant="caption"
                style={{
                  color: Colors.lightGrey
                }}
              >
                Tra 4 e 28 caratteri
              </Typography>
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
            value={this.props.values.name}
            onChange={this.getName}
            error={
              this.props.checkErrors &&
              this.idControl.isWrongNameSurname(this.state.name)
            }  
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
            value={this.props.values.surname}
            onChange={this.getSurname}
            error={
              this.props.checkErrors &&
              this.idControl.isWrongNameSurname(this.state.surname)
            }  
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.nextFocus.removeFocus();
              }              
           }}  
          />,
          <Box m={1}/>,
          <DatePicker
            value={this.props.values.birthDate}
            onChange={this.getDate}
          />
        ]}
      />
    );
  }
}

