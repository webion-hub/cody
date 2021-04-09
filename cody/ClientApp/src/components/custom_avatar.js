import React, { useEffect } from 'react';

import { Avatar, CircularProgress, useTheme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative"
  }
}));

export function CustomAvatar(props){
  const theme = useTheme()
  const classes = useStyles()
  const [loading, setLoading] = React.useState(true);
  const { disableLoading, shadow, size, propsLoading, ...other } = props;

  const handleLoading = () => {
    if(!disableLoading)
      checkImage()
  }


  const checkImage = () => {
    var img = new Image();
    img.onload = () => {
      props.onLoad?.()
      setLoading(false)
    } 
    img.onerror = () => {
      props.onError?.()
      setLoading(false)
    }
    img.src = props.src;
  }

  const isLoading = loading || propsLoading;
  const finalLoading = isLoading && !disableLoading

  const extraLoadingWidth = size / 5
  const loadingSize = size + extraLoadingWidth;

  useEffect(() => {
    handleLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.container}>
      <Skeleton
        variant="circle" 
        animation="wave"
        width={size} 
        height={size} 
        style={{
          display: finalLoading ? "block" : "none"
        }}
      />
      <CircularProgress
        thickness={2.5}
        size={loadingSize}
        style={{
          position: "absolute",
          top: -extraLoadingWidth/2,
          left: -extraLoadingWidth/2,
          display: finalLoading ? "block" : "none",
        }}
      />
      <Avatar
        {...other}
        style={{
          width: size,
          height: size,
          fontSize: `${1.25 * (size / 40)}rem`,
          display: finalLoading ? "none" : "flex",
          boxShadow: shadow && `2px 2px 6px 0px ${theme.palette.background.paperSecondary}`,
        }}
      />
    </div> 
  );
}

CustomAvatar.defaultProps = {
  size: 40,
}