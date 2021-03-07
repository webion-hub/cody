import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: "100vh",
    position: "relative",
  },
}));

export function CenterComponentPageBase(props){
  const classes = useStyles();

  return(
    <Grid
      className={`${classes.pageContainer} ${props.className}`}
      container
      direction={props.direction}
      justify="center"
      alignItems="center"
    >
      {props.children}
    </Grid>
  );
}