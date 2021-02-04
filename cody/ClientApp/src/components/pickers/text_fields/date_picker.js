import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import itLocale from "date-fns/locale/it";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

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
          inputVariant={this.props.variant}
          variant="inline"
          color="secondary"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker"
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
