
import React from 'react';

import { Typography, Grid, useTheme, useMediaQuery } from '@material-ui/core';

import { BasePhotoText } from 'src/components/bases/base_photo_text'

import { RocketLaunch } from 'src/components/illustrations/rocket_launch';


export function SignUpCompleted(){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <BasePhotoText
      image={RocketLaunch}
      margin={0.5}
      bottomMargin={2}
      items={[
        <Grid
          container
          direction="column"
          alignItems="center"
        >
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
      ]}
    />
  );
}