import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { Authentication } from '../../components/illustrations/authentication';
import { LoginBox } from './login_box';

import { Colors } from '../../index';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const base = {
  imageWidth: 330,
  formWidth: 300,
  backgroundImage: "images/bulb.jpeg",  
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export class Login extends Component {
  static displayName = Login.name;
  render () {
    const screenWidth = getWindowDimensions().width;
    const isImageBigger = base.imageWidth > screenWidth;
    const isFormBigger = base.formWidth > screenWidth;
    const isImageOrFormBigger = isImageBigger || isFormBigger;

    const padding = 3;

    const imageWidth = isImageBigger ?
      screenWidth - 5:
      base.imageWidth;

    const formWidth = isFormBigger ? 
      screenWidth - 5 : 
      base.formWidth;
    
    const sidePadding = isImageOrFormBigger ? 
      0 : 
      padding;

    return (  
      <Grid
        style={{
          height: "100vh",
          backgroundImage: `url(${base.backgroundImage})`,
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
              pt={padding}
              pb={padding}
              pl={sidePadding}
              pr={sidePadding}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Authentication size={imageWidth}/>
                <LoginBox size={formWidth}/>
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
