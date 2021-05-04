import React from 'react';
import { useSpring } from 'react-spring'

import { MainTextBox } from './components/main_text_box';
import { DynamicSearchBar } from './components/dynamic_searchbar';
import { AnimatedCoding } from 'src/components/illustrations/animated_coding/animated_coding';
import { BackgroundWithLines } from 'src/components/background_with_lines/background_with_lines';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  firstAreaBox: {
    position: "relative",
  },
  background: {
    marginTop: theme.spacing(4),
    margin: "0 auto",
    width: "33%",
    maxWidth: 700,
    [theme.breakpoints.down('md')]: {
      width: "44%",
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(6),
      width: "55%",
    },
    [theme.breakpoints.down('xs')]: {
      width: "90%",
    },
  },
}));

export default function Home(){
  const classes = useStyles();

  /**
   * Animated svg's utilities
   */
  const [springProps, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]

  return(
    <div
      style={{
        position: "relative"
      }}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <MainTextBox/>
      <DynamicSearchBar/>
      <AnimatedCoding className={classes.background} springProps={springProps}/>
      <BackgroundWithLines/> 
    </div>
  );
}
