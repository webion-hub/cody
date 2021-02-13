import React, { useEffect } from 'react';
import Img from 'react-fix-image-orientation'

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    display: "flex",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    flexShrink: 0,
    userSelect: "none",
    borderRadius: "50%",
    justifyContent: "center",
  },
  avatar: {
    display: "block",
    color: "transparent",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    textAlign: "center",
    textIndent: "10000px",
    imageOrientation: "from-image",   
  },
  altContainer: {
    background: theme.palette.background.dark,
    width: "100%",
    height: "100%",
    display: "table",
    textAlign: "center",
    position: "absolute",
  },
  alt: {
    display: "table-cell",
    verticalAlign: "middle",
    fontFamily: theme.typography.fontFamily,
  }
}));

export function CustomAvatar(props){   
  const classes = useStyles();
  const [showAlt, setShowAlt] = React.useState(false);

  useEffect(() => {
    setShowAlt(false);
  }, [props.src]);

  
  return ( 
    <Box 
      className={classes.avatarContainer}
      width={props.width? props.width : 40}
      height={props.height? props.height: 40}
      fontSize={`${1.25 * (props.width / 40)}rem`}
    >
      {
        (props.src === null || props.src === undefined) || showAlt?
          <Box
            position="absolute"
            className={classes.altContainer}
          >        
            <div className={classes.alt}>
              {props.alt ? 
                props.alt.charAt(0) 
                : 
                <PersonRoundedIcon
                  style={{
                    transform: `scale(${props.width / 40})`
                  }}
                />
              }
            </div>
          </Box>
          :
          <Img
            className={classes.avatar}
            src={props.src}
            onLoad={() => {
              setShowAlt(false)        
              props.onLoad()
            }}
            onError={() => {
              setShowAlt(true) 
              props.onError()
            }}
          />
      }
    </Box>
  );
}

/*

*/

/*
image

    color: transparent;
    width: 100%;
    height: 100%;
    object-fit: cover;
    text-align: center;
    text-indent: 10000px;
    image-orientation: from-image;
*/

/*
container



*/

/*
		<Avatar
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
*/