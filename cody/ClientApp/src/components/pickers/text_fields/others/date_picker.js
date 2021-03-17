import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import itLocale from "date-fns/locale/it";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

export function DatePicker(props){
  const [selectedDate, setSelectedDate] = React.useState(props.value);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const {onChange} = props;
    onChange(date);
  };

  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
      <KeyboardDatePicker
        minDate={new Date('01/01/1920')}
        maxDate={new Date()}
        minDateMessage="La data non deve inferiore al minimo valore"
        maxDateMessage="La data non deve superare il massimo valore"
        error={props.error}
        inputVariant={props.variant}
        variant="inline"
        color="secondary"
        format="dd/MM/yyyy"
        margin="normal"
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
