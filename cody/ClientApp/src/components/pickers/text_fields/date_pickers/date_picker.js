import DateFnsUtils from '@date-io/date-fns';
import itLocale from "date-fns/locale/it";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

export function DatePicker(props){
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
      <KeyboardDatePicker
        style={{marginBottom: 0}}
        minDate={new Date('01/01/1920')}
        maxDate={new Date()}
        minDateMessage=""
        maxDateMessage=""
        invalidDateMessage=""
        error={props.error}
        inputVariant={props.variant}
        variant="inline"
        color="secondary"
        format="dd/MM/yyyy"
        margin="normal"
        label="Data di nascita"
        fullWidth
        value={props.value}
        onChange={props.onChange}
        KeyboardButtonProps={{
          'aria-label': 'Data di nascita',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}