
import React from 'react';

import { Typography } from '@material-ui/core';

import { SignUpBase } from '../sign_up_base'

import { RocketLaunch } from '../../../components/illustrations/rocket_launch';


export function SignUpCompleted(props){
  return (
    <SignUpBase
      image={<RocketLaunch size={props.imageWidth}/>}
      formWidth={props.formWidth}
      margin={0.5}
      bottomMargin={2}
      items={[
        <Typography
          variant="h3"
        >
          Benvenuto
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