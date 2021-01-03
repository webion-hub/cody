import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { Authentication } from '../components/illustrations/authentication';
import { LoginBox } from '../components/login_box';

import { Colors } from '../index';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const base = {
  backgroundImage: "images/forest.jpeg"  
};


export class Login extends Component {
  static displayName = Login.name;
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
                <Authentication size={330}/>
                <LoginBox size={300}/>
              </Grid>
            </Box>
          </Paper> 
          <Box m={0.5}/>
          <Button
            style={{
              color: Colors.secondary
            }}
            endIcon={<ArrowForwardIcon/>}
            href="/sign-up"
          >
            Crea un account
          </Button>
        </Grid>
      </Grid>
    );
  }
}
