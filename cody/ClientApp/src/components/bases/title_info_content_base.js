import React, { useRef } from 'react';

import { Grid, IconButton } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import InfoRounded from '@material-ui/icons/InfoRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { FlowingText } from '../typography/flowing_text';

import { useGetSize } from 'src/lib/hooks/use_get_size';

const useStyles = makeStyles((theme) => ({
  paperBox: props => ({
    position: "relative",
    background: theme.palette.background.paperSecondary,
    backgroundImage: theme.palette.type === "dark" ? "url(images/waves/wavesDark.svg)" : "url(images/waves/wavesLight.svg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100%",
    maxWidth: props.width,
    maxHeight: props.height,
    minHeight: props.height,
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      width: "100vw",
      minHeight: "calc(100vh - 56px)",
      maxHeight: "none",
      marginTop: theme.appBar.mobileHeight,
    },
    transition: "max-width 0.25s, max-height 0.25s, min-height 0.25s",
  }),
  title: {
    textAlign: "center",
    width: "calc(100% - 96px)"
  },
  titleContainer: {
    width: "100%",
    padding: theme.spacing(1),
    background: theme.palette.background.paperSecondary,
  },
  cardContainer: {
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
  const height = props.height? props.height : "auto";
  const classes = useStyles({width, height});

  const infoRef = props.infoRef;
  const titleContainerRef = useRef();

  const theme = useTheme();
  const titleContainerSize = useGetSize(titleContainerRef);

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
          ref={titleContainerRef}
          className={classes.titleContainer}
          container
          direction="row"
          alignItems="center"
          justify="center"
        >
          <FlowingText
            containerWidth={titleContainerSize.width - 96}
            variant="h5"
            background={theme.palette.background.paperSecondary}
          >
            {props.title}
          </FlowingText>
          {
            props.onBack?
              <IconButton 
                className={classes.backButton}
                href={props.href}
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
          className={classes.cardContainer}
          container
          direction="row"
          alignItems="center"
        >
          {props.children}
        </Grid>
      </Grid>
    </Paper>
  );
}

