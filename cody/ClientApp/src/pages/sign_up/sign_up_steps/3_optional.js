
import React from 'react';

import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { SignUpBase } from '../sign_up_base'

import { UserProfile } from '../../../components/illustrations';


export function OptionalDatas(){
  return (
    <SignUpBase
      image={<UserProfile size={330}/>}
      formWidth={300}
      margin={1}
      bottomMargin={2}
      items={[
        <TextField
          id="school"
          label="Istituto"
          variant="outlined"
          color="secondary"
          fullWidth={true}
        />,  
      ]}
    />
  );
}