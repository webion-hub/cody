import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { LoginSvg } from '../components/illustrations/loginSvg'
import { LoginBox } from '../components/loginBox'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export class Login extends Component {
  static displayName = Login.name;
  render () {
    return (  
      <Grid
        style={{height: "100vh"}}
        container
        justify="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"          
        >
          <Paper elevation={3}>
            <Box p={3}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >      
                <LoginSvg size={360}/>
                <LoginBox size={300}/>
              </Grid>
            </Box>
          </Paper> 
          <Box m={0.5}/>
          <Button
            color="secondary"
            variant="outlined"
            endIcon={<ArrowForwardIcon/>}
          >
            Crea un account
          </Button>         
        </Grid>
      </Grid>
    );
  }
}
