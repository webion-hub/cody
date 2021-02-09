import React from 'react';
import { Box } from '@material-ui/core';
import { animated } from 'react-spring'
import { makeStyles } from '@material-ui/core/styles';

import { Colors } from 'src/lib/default_values/themes/colors/main_colors';
import { P1 } from './p1';
import { P2 } from './p2';
import { P3 } from './p3';
import { P4 } from './p4';


const useStyles = makeStyles((theme) => ({
  absoluteSvg: {
    position: "absolute",
    width: "100%",
  },
  relativeSvg: {
    position: "relative",
    width: "100%",
  },
}));


export function AnimatedCoding(props){
  const classes = useStyles();

  const trans1 = (x, y) => `translate3d(${x / 80}px,${y / 120 }px,0)`
  const trans2 = (x, y) => `translate3d(${x / 60}px,${y / 100 }px,0)`
  const trans3 = (x, y) => `translate3d(${x / 40}px,${y / 80 }px,0)`
  const trans4 = (x, y) => `translate3d(${x / 100}px, 0px,0)`

  return (
    <Box
      width={props.size === "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
			className={props.className}
      position="relative"
    >
      <animated.div
        className={classes.absoluteSvg}
        style={{transform: props.springProps.xy.interpolate(trans1)}}
      >
        <P1/>
      </animated.div>
      <animated.div 
        className={classes.absoluteSvg}
        style={{transform: props.springProps.xy.interpolate(trans2)}}
      >
        <P2/>
      </animated.div>
      <animated.div 
        className={classes.absoluteSvg}
        style={{transform: props.springProps.xy.interpolate(trans3)}}
      >
        <P3/>
      </animated.div>
      <animated.div 
        className={classes.relativeSvg}
        style={{transform: props.springProps.xy.interpolate(trans4)}}
      >
        <P4/>
      </animated.div>    
    </Box>
  );
}