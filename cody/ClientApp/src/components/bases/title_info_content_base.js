import React, { useRef } from 'react';

import { Grid, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import InfoRounded from '@material-ui/icons/InfoRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { FlowingText } from '../typography/flowing_text';
import { PaperWithTransitionBase } from './paper_with_transition_base';

import { useGetSize } from 'src/lib/hooks/use_get_size';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    width: "calc(100% - 96px)"
  },
  titleContainer: {
    width: "100%",
    padding: theme.spacing(1),
    background: theme.palette.background.paperSecondary,
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
  const classes = useStyles();

  const infoRef = props.infoRef;
  const titleContainerRef = useRef();

  const theme = useTheme();
  const titleContainerSize = useGetSize(titleContainerRef);

  const scrollToInfo = () => {
    infoRef.current.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  const titleComponent =     
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

  return(
    <PaperWithTransitionBase
      width={props.width}
      height={props.height}
      title={titleComponent}
      direction="row"
    >
      {props.children}
    </PaperWithTransitionBase>
  );
}

