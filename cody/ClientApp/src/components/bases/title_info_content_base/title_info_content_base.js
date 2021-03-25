import React, { useRef } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { FlowingText } from '../../typography/flowing_text';
import { BackButton } from './components/back_button';
import { OpenAndCloseInfoButton } from './components/open_and_close_info_button';
import { PaperWithTransitionBase } from '../paper_with_transition_base';

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
  
  const theme = useTheme();
  const titleContainerRef = useRef();
  const titleContainerSize = useGetSize(titleContainerRef);
  const titleWidth = titleContainerSize.width - 96;

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
        containerWidth={titleWidth}
        variant="h5"
        background={theme.palette.background.paperSecondary}
      >
        {props.title}
      </FlowingText>
      <BackButton
        hideBackButton={props.hideBackButton}
      />
      <OpenAndCloseInfoButton
        hideInfoButton={props.hideInfoButton}
      />
    </Grid>

  return(
    <PaperWithTransitionBase
      width={props.width}
      height={props.height}
      overflow={props.overflow}
      title={titleComponent}
      direction="row"
    >
      {props.children}
    </PaperWithTransitionBase>
  );
}

