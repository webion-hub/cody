
import React from 'react';

import { Typography } from '@material-ui/core';

import { SignUpBase } from '../sign_up_base'

import { CheckList } from '../../../components/illustrations';


export function SignUpCompleted(){
  return (
    <SignUpBase
      image={<CheckList size={330}/>}
      formWidth={300}
      margin={0.5}
      bottomMargin={2}
      items={[
        <Typography
          variant="h3" 
        >
          Benvenuto,
        </ Typography>,  
        <Typography
          variant="h4" 
        >
          in Cody
        </ Typography>, 
      ]}
    />
  );
}