
import React from 'react';

import { Typography, Grid, useTheme, useMediaQuery } from '@material-ui/core';


import { Form } from 'src/lib/default_values/sizes/form_size';
import { RocketLaunch } from 'src/components/illustrations/illustrations/illustrations';


export function SignUpCompleted(){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
    >
      <RocketLaunch
        boxProps={{
          maxWidth: Form.width
        }}
      />
      <Typography
        variant={mobileView ? "h4" : "h3"}
      >
        Benvenuto
      </ Typography>
      <Typography
        variant={mobileView ? "h5" : "h4"}
      >
        in Cody
      </ Typography>
    </Grid>
  );
}