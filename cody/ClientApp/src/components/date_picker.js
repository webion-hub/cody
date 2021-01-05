import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

export function DatePicker() {
    const newDate = new Date()
    const [selectedDate, setSelectedDate] = React.useState(newDate.getDate());
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          inputVariant="outlined"
          variant="inline"
          color="secondary"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker"
          label="Data di nascita"
          fullWidth={true}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'Data di nascita',
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }