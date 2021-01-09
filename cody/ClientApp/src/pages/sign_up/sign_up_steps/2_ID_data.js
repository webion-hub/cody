
import React, {Component} from 'react';


import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Colors } from '../../../index';
import { SignUpBase } from '../sign_up_components/sign_up_base'
import { DatePicker } from '../../../components/date_picker';
import { NextFocus } from '../../../lib/next_focus';

import { IDController, checkID } from '../../../lib/format_controller/id_controller';

import { Step2 } from '../../../components/illustrations/step2';

export class IDData extends Component{

  constructor(props) {
    super(props);
    this.getDate = this.getDate.bind(this);
    
    this.state = {
      username: this.props.values.username,
      name: this.props.values.name,
      surname: this.props.values.surname,
      birthDate: this.props.values.birthDate,

      usernameError: false,
      nameError: false,
      surnameError: false,
    }

    this.updateFormError(
      this.state.username,
      this.state.name,
      this.state.surname,
    );

    this.nextFocus = new NextFocus(["username", "name", "surname"]);
  }

  getUsername = (event) => {
    this.setState({username: event.target.value });

    this.updateFormError(
      event.target.value,
      this.state.name,
      this.state.surname,
    );
    

  };

  getName = (event) => {
    this.setState({name: event.target.value });

    this.updateFormError(
      this.state.username,
      event.target.value,
      this.state.surname,
    );


  };

  getSurname = (event) => {
    this.setState({surname: event.target.value });    

    this.updateFormError(
      this.state.username,
      this.state.name,
      event.target.value
    );


  };

  getDate(value){
    this.setState({birthDate: value});
    const {date} = this.props;

    date(value);
  }

  updateFormError(username, name, surname){
    const idControl = new IDController();

    idControl.checkUsername(username).then(
      result => {
        this.setState({usernameError: result});
      }
    );   

    checkID(name).then(
      result => {
        this.setState({nameError: result});
      }
    );

    checkID(surname).then(
      result => {
        this.setState({surnameError: result});
      }
    );
  }

  componentDidUpdate(prevProps, prevState){
    const usernameUpdate = prevState.usernameError != this.state.usernameError
    const nameUpdate = prevState.nameError != this.state.nameError;
    const surnameUpdate = prevState.surnameError != this.state.surnameError;

    if(usernameUpdate || nameUpdate || surnameUpdate)
    {
      const {formError} = this.props;
      const usernameError = this.state.usernameError;
      const nameError = this.state.nameError;
      const surnameError = this.state.surnameError;
      const error = usernameError || nameError || surnameError;

      formError(error);  
      
      const {username} = this.props;
      const {name} = this.props;
      const {surname} = this.props;

      username(this.state.username);      
      name(this.state.name);      
      surname(this.state.surname);
    }
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
                  value={this.state.username}
                  onChange={this.getUsername}
                  error={
                    this.state.usernameError &&
                    this.props.checkErrors                     
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
            value={this.state.name}
            onChange={this.getName}
            error={
              this.state.nameError &&
              this.props.checkErrors        
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
            value={this.state.surname}
            onChange={this.getSurname}
            error={
              this.state.surnameError &&
              this.props.checkErrors   
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

