import React, { useEffect } from 'react';

import { Avatar, CircularProgress, useTheme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function CustomAvatar(props){
  const theme = useTheme()
  const [loading, setLoading] = React.useState(true);

  const propsOnLoad = props.onLoad? 
    props.onLoad() : () => {}

  const propsOnError = props.onError? 
    props.onError() : () => {}

  const handleLoading = () => {
    if(!props.disableLoading)
      checkImage()
  }

  const checkImage = () => {
    var img = new Image();
    img.onload = () => {
      propsOnLoad()
      setLoading(false)
    } 
    img.onerror = () => {
      propsOnError()
      setLoading(false)
    }
    img.src = props.src;
  }

  useEffect(() => {
    handleLoading();
  }, [])

  const finalLoading = loading && !props.disableLoading
  const size = props.size? props.size : 40

  const extraLoadingWidth = size / 5
  const loadingSize = size + extraLoadingWidth;

  return (
    <div
      style={{
        position: "relative"
      }}
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
        {...props}
        style={{
          width: size,
          height: size,
          fontSize: `${1.25 * (size / 40)}rem`,
          display: finalLoading ? "none" : "flex",
          boxShadow: props.shadow ? `2px 2px 6px 0px ${theme.palette.background.paperSecondary}` : null,
        }}
      />
    </div> 
  );
}