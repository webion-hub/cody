import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import itLocale from "date-fns/locale/it";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

export function DatePicker() {
    const newDate = new Date()
    const [selectedDate, setSelectedDate] = React.useState(new Date('2000-01-01T21:11:54'));
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
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