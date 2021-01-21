import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { Authentication } from '../../components/illustrations/authentication';
import { LoginBox } from './login_box';

import { Form } from '../../lib/default_values/sizes/form_size';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Images } from '../../lib/default_values/images';

export class Login extends Component {
  static displayName = Login.name;
  render () {
    return (
      <Grid
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${Images.forestImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center"
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
            <Box
              p={3}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Authentication size={Form.imageWidth}/>
                <LoginBox size={Form.width}/>
              </Grid>
            </Box>
          </Paper> 
          <Box m={0.5}/>
          <Button
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(0,0,0,0.2)",
              color: "rgba(255,255,255,0.9)",
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
