import React from 'react';

import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const mainTextStyles = makeStyles((theme) => ({ 
  box: {
    [theme.breakpoints.up('sm')]: {
      alignItems: "center !important",
    },

    paddingTop: theme.spacing(18),
    marginBottom: 30,

    [theme.breakpoints.down('xs')]: {
      alignItems: "left !important",
      maxWidth: "500px",
      margin: "0 auto",
      paddingTop: "25vh",
      paddingBottom: "5px"
    },
  },
  title: {
    fontWeight: 400,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 30,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "10vw",
      marginBottom: "3vw",
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: "left",
      fontSize: "3.3rem",
      lineHeight: "1",
      marginLeft: 20,
      marginBottom: 0,
    },
  },
  subtitle: {
    [theme.breakpoints.up('sm')]: {
      position: "absolute",
      transform: "translate(0px, 40px)",  
    },
    [theme.breakpoints.down('sm')]: {
      position: "absolute",
      fontSize: "3.5vw",
      transform: "translate(0px, 5vw)",
    },
    [theme.breakpoints.down('xs')]: {
      position: "relative",
      fontSize: "1.3rem",
      transform: "translate(0px, 0px)",
      marginLeft: "20px"
    },
  },
  children: {
    position: "absolute"
  }
}));
  
  
export function MainTextBox(props){
  const classes = mainTextStyles();

  return(
    <Grid
      className={classes.box}
      container
      direction="column"
      justify="center"
    >
      <Typography
        variant="h1"
        className={classes.title}
      >
        Cerca una classe
      </Typography>
      <Typography
        variant="h4"
        className={classes.subtitle}
      >
        e impara a programmare
      </Typography>
    </Grid>
  );
}