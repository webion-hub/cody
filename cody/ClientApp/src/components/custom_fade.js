import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fadeIn: {
    animation: `$fade 0.25s linear`,
  },
  "@keyframes fade": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  }
}));

export function CustomFade(props){
	const classes = useStyles();
  const {
    children,
  } = props
  
  const childrenWithFade = React.Children.map(children, child =>
    React.cloneElement(child, { 
      className: `${child.props.className} ${classes.fadeIn}` 
    }),
  );

  return childrenWithFade
}