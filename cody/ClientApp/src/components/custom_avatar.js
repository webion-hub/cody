import React, { useEffect } from 'react';

import { Avatar } from '@material-ui/core';

export function CustomAvatar(props){   
  const checkImage = () => {
    var img = new Image();
    img.onload = props.onLoad; 
    img.onerror = props.onError;
    img.src = props.src;
  }

  useEffect(() => {
    checkImage();
  })

  return (    
		<Avatar 
			alt={props.alt}
			classes={props.classes}
			component={props.component}
			imgProps={props.imgProps}
			sizes={props.sizes}
			srcSet={props.srcSet}
			variant={props.variant}
			src={props.src}
		/>
  );
}