import React from 'react';

import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(3),
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
    },
	},
  button: {
    marginTop: theme.spacing(2),
    width: 200,
    margin: "0 auto",
    display: "block"
  }
}));

export function MessagePageBase(props) {
	const classes = useStyles();

  return (
    <Grid
      style={{
        minHeight: "100vh"
      }}
      container
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <props.image 
          maxWidth={500}
          size="100%"
          margin="0 auto"
        />
        <Typography
          component="h1"
          variant="h3"
          align="center"
        >
          {props.title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
        >
          {props.subTitle}
        </Typography>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={props.onClick}
          fullWidth={true}
        >
          {props.buttonLabel}
        </Button>
      </Paper>
    </Grid>
  );
}
