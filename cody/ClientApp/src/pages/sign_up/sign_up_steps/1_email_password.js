
import React from 'react';

import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Password } from '../../../components/password_textfield';
import { SignUpBase } from '../sign_up_base';
import { Colors } from '../../../index';

import { Step1 } from '../../../components/illustrations/step1';

export function EmailPassword(props){
  return (
    <SignUpBase
      image={<Step1 size={props.imageWidth}/>}
      formWidth={props.formWidth}
      margin={1}
      bottomMargin={2}
      items={[
        <Typography
          variant="body2"
          color="secondary"
        >
          Email &amp; Password
        </Typography>,
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          color="secondary"
          fullWidth={true}
        />,
        <Box m={3}/>,
        <Box>
          <Password
            label="Password"
            labelWidth={70}
          />
          <Typography
            variant="caption"
            style={{
              color: Colors.lightGrey
            }}
          >
            Tra 6 e 16 caratteri
          </Typography>
        </Box>,
        <Password
          label="Conferma Password"
          labelWidth= {148}
        />
      ]}
    />
  );
}
