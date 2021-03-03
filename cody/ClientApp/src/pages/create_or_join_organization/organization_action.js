import React from 'react';

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    width: `calc(50% - ${theme.spacing(2)}px)`,
    [theme.breakpoints.down('xs')]: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
    },
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  imageContainer: {
    width: "100%"
  }
}));

export function OrganizationAction(props){
  const classes = useStyles();

  return(
    <div className={classes.card}>
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <div className={classes.imageContainer}>
          <props.image size="100%"/>
        </div>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={props.endIcon}
          onClick={props.onClick}
        >
          {props.buttonLabel}
        </Button>
      </Grid>
    </div>
  )
}