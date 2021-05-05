import React, { useEffect } from 'react';

import { Avatar, CircularProgress, useTheme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative"
  }
}));

export const CustomAvatar = React.forwardRef((props, ref) => {
  const theme = useTheme()
  const classes = useStyles()
  const [loading, setLoading] = React.useState(true);
  const { 
    disableLoading,
    shadow, 
    size,
    onLoadEnd,
    loading: propsLoading, 
    disableLoadingRing, 
    ...other 
  } = props;

  const handleLoadEnd = () => {
    onLoadEnd?.()
    setLoading(false)
  }

  const handleLoading = () => {
    if(!disableLoading)
      checkImage()
  }

  const checkImage = () => {
    var img = new Image();
    img.onload = () => {
      props.onLoad?.()
      handleLoadEnd()
    } 
    img.onerror = () => {
      props.onError?.()
      handleLoadEnd()
    }
    img.src = props.src;
  }

  const isLoading = loading || propsLoading;
  const finalLoading = isLoading && !disableLoading

  const extraLoadingWidth = size / 5
  const loadingSize = size + extraLoadingWidth;

  useEffect(() => {
    setLoading(true)
    handleLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.src])

  useEffect(() => {
    if(disableLoading)
      handleLoadEnd()
  }, [disableLoading])

  return (
    <div 
      ref={ref}
      className={classes.container}
    >
      <Skeleton
        variant="circle" 
        animation="wave"
        width={size} 
        height={size} 
        style={{
          display: finalLoading ? "block" : "none"
        }}
      />
      {
        !disableLoadingRing &&
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
      }
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
})

CustomAvatar.defaultProps = {
  size: 40,
}