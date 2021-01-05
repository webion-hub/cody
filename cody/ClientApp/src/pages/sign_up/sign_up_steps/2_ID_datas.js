
import React, {Component} from 'react';


import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Colors } from '../../../index';
import { SignUpBase } from '../sign_up_base'
import { DatePicker } from '../../../components/date_picker';

import { FormatControl } from '../../../components/format_control/format_control';
import { IDControl } from '../../../components/format_control/id_control';

import { Step2 } from '../../../components/illustrations/step2';

export class IDDatas extends Component{

  constructor(props) {
    super(props);
    
    this.formatControl = new FormatControl();
    this.idControl = new IDControl();

    this.state = {
      username: '',
      name: '',
      surname: '',
    }

    const {areErrors} = this.props;
    areErrors(true);
  }



  getUsername = (event) => {
    this.setState({username: event.target.value });
    const {areErrors} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsId(
      event.target.value,
      this.state.name, 
      this.state.surname);

    areErrors(areErrorsCheck);
  };

  getName = (event) => {
    this.setState({name: event.target.value });
    const {areErrors} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsId(
      this.state.username,
      event.target.value, 
      this.state.surname);

    areErrors(areErrorsCheck);
  };

  getSurname = (event) => {
    this.setState({surname: event.target.value });
    const {areErrors} = this.props;

    const areErrorsCheck = this.formatControl.areErrorsId(
      this.state.username,
      this.state.name, 
      event.target.value);

    areErrors(areErrorsCheck);
  };


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
                  fullWidth={true}
                  onChange={this.getUsername}
                  error={
                    this.props.checkErrors && 
                    this.idControl.isWrongUsername(this.state.username)
                  }  
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
            fullWidth={true}
            onChange={this.getName}
            error={
              this.props.checkErrors &&
              this.idControl.isWrongNameSurname(this.state.name)
            }  
          />,
          <TextField
            id="surname"
            label="Cognome"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            onChange={this.getSurname}
            error={
              this.props.checkErrors &&
              this.idControl.isWrongNameSurname(this.state.surname)
            }  
          />,
          <Box m={1}/>,
          <DatePicker/>
        ]}
      />
    );
  }
}

