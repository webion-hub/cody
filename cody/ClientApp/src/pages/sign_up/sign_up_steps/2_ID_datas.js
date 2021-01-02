
import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { Box } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { SignUpBase } from '../sign_up_base'

import { PersonalData2SVG } from '../../../components/illustrations';


export function IDDatas(){
  return (
    <SignUpBase
      image={<PersonalData2SVG size={330}/>}
      formWidth={300}
      margin={1}
      bottomMargin={2}
      items={[
        <Tooltip 
          title={          
            <Typography 
              variant="subtitle2" 
            >
              L'username deve essere lungo dai 4 ai 28 caratteri.
            </Typography>
          }
          aria-label="password"
          placement="right"              
          arrow
          interactive
        >
          <Box>
            <TextField
                id="username"
                label="Username"
                variant="outlined"
                color="secondary"
                fullWidth={true}
            />
          </Box>
        </Tooltip>,  
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
  // The first commit of Material-UI
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