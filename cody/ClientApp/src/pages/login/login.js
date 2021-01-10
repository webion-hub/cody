import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { Authentication } from '../../components/illustrations/authentication';
import { LoginBox } from './login_box';

import { Colors } from '../../index';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Base, getWindowDimensions, Images } from '../../index';


export class Login extends Component {
  static displayName = Login.name;
  render () {
    const screenWidth = getWindowDimensions().width;
    const isImageBigger = Base.formImageWidth > screenWidth;
    const isFormBigger = Base.formWidth > screenWidth;
    const isImageOrFormBigger = isImageBigger || isFormBigger;

    const padding = 3;

    const imageWidth = isImageBigger ?
      screenWidth - 5:
      Base.formImageWidth;

    const formWidth = isFormBigger ? 
      screenWidth - 5 : 
      Base.formWidth;
    
    const sidePadding = isImageOrFormBigger ? 
      0 : 
      padding;

    return (  
      <Grid
        style={{
          height: "100vh",
          backgroundImage: `url(${Images.bulbImage})`,
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
