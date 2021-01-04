
import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { Colors } from '../../../index';
import { SignUpBase } from '../sign_up_base'

import { Step2 } from '../../../components/illustrations/step2';


export function IDDatas(props){
  return (
    <SignUpBase
      image={<Step2 size={props.imageWidth}/>}
      formWidth={props.formWidth}
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
        />,
        <TextField
          id="surname"
          label="Cognome"
          variant="outlined"
          color="secondary"
          fullWidth={true}
        />,
        <Box m={1}/>,
        <DatePicker/>
      ]}
    />
  );
}


function DatePicker() {
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