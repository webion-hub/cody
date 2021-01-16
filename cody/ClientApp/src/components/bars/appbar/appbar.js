import React from 'react';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

export function AppBar(props) {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography 
          variant="h6" 
          noWrap
        >
          cody
        </Typography> 
      </Grid>
    </div>
  );
}
