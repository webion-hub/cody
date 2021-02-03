import React, { Component } from 'react';

import { Box, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { Paper } from '@material-ui/core';

import { Confirmation } from 'src/components/illustrations/confirmation';

import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

import history from 'src/history'

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
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <CheckRoundedIcon
                style={{
                  fontSize: "50"
                }}
              />
              <Typography
                component="h1"
                variant="h3"
                align="center"
              >
                Email valida
              </Typography>
            </Grid>
            <div
              style={{
                padding: "0 20px"
              }}
            >
              <Typography
                variant="subtitle1"
                align="center"
              >            
                La tua email è stata validata, ora puoi iniziare ad esplorare cody.
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
                onClick={() => history.push('/')}
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
