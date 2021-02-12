import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    transform: "translate(0px, 0px) !important"
  },
}));

export function CustomAvatar(props){   
  const classes = useStyles();
  const checkImage = () => {
    var img = new Image();
    img.onload = props.onLoad; 
    img.onerror = props.onError;
    img.src = props.src;
  }

  useEffect(() => {
    checkImage();
  }, [])

  return (    
		<Avatar
      className={classes.avatar}
			classes={props.classes}
			component={props.component}
			imgProps={props.imgProps}
			sizes={props.sizes}
			srcSet={props.srcSet}
			variant={props.variant}
			src={props.src}
      style={props.style}
      onLoad={props.onLoad}
      onError={props.onError}
      style={{
        width: props.width,
        height: props.height,
        fontSize: `${1.25 * (props.width / 40)}rem`,
      }}
		>
      {props.alt? props.alt.charAt(0) : null}
    </Avatar>
  );
}