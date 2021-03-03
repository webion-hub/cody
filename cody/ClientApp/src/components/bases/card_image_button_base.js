import React from 'react';

import { Card, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    width: `calc(50% - ${theme.spacing(2)}px)`,
    [theme.breakpoints.down('xs')]: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
    },
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    background: theme.palette.background.paperSecondary
  },
  imageContainer: {
    width: "100%"
  }
}));

export function CardImageButtonBase(props){
  const classes = useStyles();

  return(
    <Card className={classes.card}>
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
    </Card>
  )
}