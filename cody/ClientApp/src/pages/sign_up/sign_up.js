import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { EmailPassword } from './sign_up_steps/1_email_password';
import { IDDatas } from './sign_up_steps/2_ID_datas';
import { OptionalDatas } from './sign_up_steps/3_optional';
import { SignUpCompleted } from './sign_up_steps/sign_up_completed';

import { HorizontalLinearStepper } from '../../components/stepper';

const base = {
  imageWidth: 330,
  formWidth: 300,
  backgroundImage: "images/forest.jpeg"  
};

export class SignUp extends Component {
  static displayName = SignUp.name;
  render () {
    return (  
      <Grid
        style={{
          height: "100vh",
          backgroundImage: `url(${base.backgroundImage})`
        }}
        container
        justify="center"
        alignItems="center"
      >        
        <Paper elevation={3}>
          <Box p={3}>
            <Grid
              container
              direction="column"
            >
              <HorizontalLinearStepper
                steps={3}
                stepsContent={
                  [
                    <EmailPassword
                      imageWidth = {base.imageWidth}
                      formWidth = {base.imageWidth}
                    />,
                    <IDDatas
                    imageWidth = {base.imageWidth}
                    formWidth = {base.imageWidth}
                    />,    
                    <OptionalDatas
                    imageWidth = {base.imageWidth}
                    formWidth = {base.imageWidth}
                    />,
                  ]
                }
                optionalSteps={[3]}
                completed={
                  <SignUpCompleted
                      imageWidth = {base.imageWidth}
                      formWidth = {base.imageWidth}
                  />
                }
              />
            </Grid>
          </Box>
        </Paper>
      </Grid>
    );
  }
}




