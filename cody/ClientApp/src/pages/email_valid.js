import React, { Component } from 'react';

import { Box, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { Paper } from '@material-ui/core';

import { Confirmation } from '../components/illustrations/confirmation';

export class EmailValid extends Component {
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
            <Confirmation 
              maxWidth={500}
              margin="0 auto"
            />
            <Typography
              component="h1"
              variant="h3"
              align="center"
            >
              Email valida
            </Typography>
            <div
              style={{
                padding: "0 20px"
              }}
            >
              <Typography
                variant="subtitle1"
                align="center"
              >            
                La tua email è stata validata, inizia ad esplorare cody.
              </Typography>
              <Divider />
            </div>
            <Box
              mt={2}
              width={200}
              margin="0 auto"
            >
              <Button
                color="primary"
                variant="contained"
                href="/"
                fullWidth={true}
              >
                Vai alla home
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    );
  }
}
