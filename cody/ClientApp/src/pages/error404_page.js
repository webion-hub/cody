import React, { Component } from 'react';

import { Box, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Paper } from '@material-ui/core';

import { Error404 } from 'src/components/illustrations/error404';

import history from 'src/history'

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
        <Paper>
          <Box
            p={3}
          >
            <Error404 
              maxWidth={500}
              margin="0 auto"
            />
            <Typography
              component="h1"
              variant="h3"
              align="center"
            >
              Pagina non trovata
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
            >
              Ci scusiamo, probabilmente l'url inserita è sbagliata o non esiste più.
            </Typography>
            <Skeleton />
            <Box
              mt={2}
              width={200}
              margin="0 auto"
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => history.push('/')}
                fullWidth={true}
              >
                Torna alla home
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    );
  }
}
