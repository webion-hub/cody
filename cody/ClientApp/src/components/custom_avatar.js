import React, { useEffect } from 'react';

import { Avatar, useTheme } from '@material-ui/core';
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

  return (
    <>
      <Skeleton
        variant="circle" 
        animation="wave"
        width={props.width? props.width : 40} 
        height={props.height? props.height : 40} 
        style={{
          display: finalLoading ? "block" : "none"
        }}
      />
      <Avatar
        alt={props.alt}
        className={props.className}
        classes={props.classes}
        component={props.component}
        imgProps={props.imgProps}
        sizes={props.sizes}
        srcSet={props.srcSet}
        variant={props.variant}
        src={props.src}
        style={props.style}
        style={{
          width: props.width,
          height: props.height,
          fontSize: `${1.25 * (props.width / 40)}rem`,
          display: finalLoading ? "none" : "flex",
          boxShadow: props.shadow ? `2px 2px 6px 2px ${theme.palette.background.paperSecondary}` : null,
        }}
      />
    </> 
  );
}