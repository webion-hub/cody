import React from 'react';

import Grid from '@material-ui/core/Grid';
import { Fade } from '@material-ui/core';

export function AppBarSection(props){
  if(props.hide)
    return null;

  return (
    <Fade
      in={props.fadeIn}
    >
      <Grid 
        item 
        xs={props.size} 
        container
        direction="row"
        justify={props.position}
        alignItems="center"
      >
        {props.children}
      </Grid>
    </Fade>
  )
} 