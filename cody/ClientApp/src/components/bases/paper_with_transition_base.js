import React from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { waves } from 'src/lib/default_values/images/svg_backgrounds';

const useStyles = makeStyles((theme) => ({
  paperBox: props => ({
    position: "relative",
    background: theme.palette.background.paperSecondary,
    backgroundImage: `url(${theme.palette.type === "dark" ? waves.dark : waves.light})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100%",
    maxWidth: props.width,
    height: props.height,
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      width: "100vw",
      minHeight: "calc(100vh - 56px)",
      maxHeight: "none",
      marginTop: theme.appBar.mobileHeight,
    },
    transition: "max-width 0.25s, height 0.25s, height 0.25s",
  }),
  childrenContainer: {
    padding: theme.spacing(1),
    "& > *": {
      animation: `$fade 0.5s linear`,
    }
  },
  "@keyframes fade": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  },
}));

export function PaperWithTransitionBase(props){
  const width = props.width? props.width : "auto";
  const height = props.height? props.height : "auto";
  const classes = useStyles({width, height});

  return(
    <Paper className={classes.paperBox}>
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        {props.title}
        <Grid
          className={classes.childrenContainer}
          container
          direction={props.direction}
          alignItems="center"
        >
          {props.children}
        </Grid>
      </Grid>
    </Paper>
  );
}

