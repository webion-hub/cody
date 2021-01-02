
import React from 'react';

import { Box } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Password } from '../../../components/password_textfield'
import { SignUpBase } from '../sign_up_base'

import { PersonalDataSVG } from '../../../components/illustrations';

export function EmailPassword(){
  return (
    <SignUpBase
      image={<PersonalDataSVG size={330}/>}
      formWidth={300}
      margin={1}
      bottomMargin={2}
      items={[
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          color="secondary"
          fullWidth={true}          
        />,
        <TextField
          id="confirmEmail"
          label="Conferma email"
          variant="outlined"
          color="secondary"
          fullWidth={true}
        />,
        <Box m={1.5}/>,
        <Tooltip 
          title={          
            <Typography 
              variant="subtitle2" 
            >
              La password deve essere lunga dai 6 ai 16 caratteri.
            </Typography>
          }
          aria-label="password"
          placement="right"              
          arrow
          interactive
        >
          <Box>
            <Password
              label="Password"
              labelWidth= {70}
            />
          </Box>
        </Tooltip>, 
        <Password
          label="Conferma Password"
          labelWidth= {148}
        />        
      ]}
    />
  );
}
