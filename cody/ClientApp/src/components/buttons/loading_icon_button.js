import React from 'react';

import { IconButton } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loadingIconButton :{
    position: "absolute",
    top: 0,
  }
}));

export function LoadingIconButton(props){
  const classes = useStyles();

  const {variant, color, loading, ...otherProps} = props;
  const disabledButton = props.loading || props.disabled

  const loadingAnimation = loading &&
    <div className={classes.loadingIconButton}>
      <CircularProgress size={48}/>
    </div>

  return (
    <>
      <IconButton
        {...otherProps}
        variant={variant ? variant : "contained"}
        color={color ? color : "primary"}
        disabled={disabledButton}
      >
        {props.icon}
      </IconButton>
      {loadingAnimation}
    </>
  ) 
}