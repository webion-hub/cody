import React from 'react';

import { Grid, IconButton } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InfoRounded from '@material-ui/icons/InfoRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';


const useStyles = makeStyles((theme) => ({
  paperBox: props => ({
    position: "relative",
    maxWidth: props.width,
    width: "100%",
    background: theme.palette.background.paperSecondary,
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
    },
  }),
  title: {
    textAlign: "center",
    width: "calc(100% - 96px)"
  },
  titleContainer: {
    width: "100%",
    padding: theme.spacing(1),
    background: theme.palette.background.backgroundTransparent,
  },
  cardContainer: {
    padding: theme.spacing(1),
  },
  infoButton: {
    position: "absolute",
    right: 0
  },
  backButton: {
    position: "absolute",
    left: 0
  },
  showInfo: {
    textAlign: "center",
  }
}));

export function TitleInfoContentBase(props){
  const width = props.width? props.width : 750;
  const classes = useStyles({width});
  const infoRef = props.infoRef;

  const scrollToInfo = () => {
    infoRef.current.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  return(
    <Paper className={classes.paperBox}>
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Grid
          className={classes.titleContainer}
          container
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Typography
            className={classes.title}
            variant="h5"
            component="h1"
          >
            {props.title}
          </Typography>
          {
            props.onBack?
              <IconButton 
                className={classes.backButton}
                onClick={props.onBack}
              >
                <ArrowBackRoundedIcon/>
              </IconButton>
              :
              null
          }
          {
            props.infoRef?
              <IconButton 
                className={classes.infoButton}
                onClick={scrollToInfo}
              >
                <InfoRounded/>
              </IconButton>
              :
              null
          }
        </Grid>
        <Grid
          container
          direction="row"
          className={classes.cardContainer}
        >
          {props.children}
        </Grid>
      </Grid>
    </Paper>
  );
}