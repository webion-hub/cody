import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import itLocale from "date-fns/locale/it";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { InputAdornment, TextField } from '@material-ui/core';
import UndoRounded from '@material-ui/icons/UndoRounded';

export class DatePicker extends Component{
  constructor(props){
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);

    this.state = {
      selectedDate: this.props.value,
    }
  }

  handleDateChange = (date) => {
    this.setState({selectedDate: date});

    const {onChange} = this.props;
    onChange(date);
  };

  render(){
    return(
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
        <KeyboardDatePicker
          minDate={new Date('01/01/1920')}
          maxDate={new Date()}
          minDateMessage="La data non deve inferiore al minimo valore"
          maxDateMessage="La data non deve superare il massimo valore"
          error={this.props.error}
          inputVariant={this.props.variant}
          variant="inline"
          color="secondary"
          format="dd/MM/yyyy"
          margin="normal"
          label="Data di nascita"
          fullWidth={true}
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'Data di nascita',
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
}
