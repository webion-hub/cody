import React, { Component } from 'react';

import { Box, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { Error404 } from '../../components/illustrations/error404';

export class Error404Page extends Component {
  static displayName = Error.name; 
  render () {
    return (
      <Grid
        style={{
          minHeight: "100vh"
        }}
        container
        justify="center"
        alignItems="center"
      >
        <div>
          <Error404 
            maxWidth={500}
            margin="0 auto"
          />
          <Typography
            component="h1"
            variant="h2"
            align="center"
          >
            Pagina non trovata
          </Typography>
          <Box
            width={200}
            margin="0 auto"
          >
            <Button
              color="primary"
              variant="contained"
              href="/"
              fullWidth={true}
            >
              Torna alla home
            </Button>
          </Box>
        </div>
      </Grid>
    );
  }
}
