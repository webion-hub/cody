import React from 'react';

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    maxWidth: 200
  },
  card: props => ({
    width: `calc(${props.width} - ${theme.spacing(2)}px)`,
    maxWidth: props.maxWidth,
    [theme.breakpoints.down('xs')]: {
      maxWidth: props.maxWidth,
      width: `calc(100% - ${theme.spacing(2)}px)`,
    },
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  }),
  imageContainer: {
    width: "100%",
    maxWidth: 300
  }
}));

export function OrganizationAction(props){
  const width = props.width? props.width : "50%"
  const maxWidth = props.maxWidth? props.maxWidth : "auto"
  const classes = useStyles({width, maxWidth});

  return(
    <div className={classes.card}>
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <div className={classes.imageContainer}>
          {props.image}
        </div>
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          endIcon={props.endIcon}
          href={props.href}
          onClick={props.onClick}
        >
          {props.buttonLabel}
        </Button>
      </Grid>
    </div>
  )
}