import React from 'react';

import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PasswordControl } from '../../lib/format_control/password_control';

const progressBarColors = {
  green: {
    primary: "rgb(51, 204, 51)",
    secondary: "rgba(102, 255, 153, 0.25)"
  },
  yellow: {
    primary: "rgb(255, 204, 0)",
    secondary: "rgba(255, 255, 153, 0.25)"
  },
  red: {
    primary: "rgb(255, 80, 80)",
    secondary: "rgba(255, 153, 153, 0.25)"
  }
}

const useStyles = makeStyles({
  strong: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: progressBarColors.green.primary,
    },
      backgroundColor: progressBarColors.green.secondary,
  },
  medium: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: progressBarColors.yellow.primary,
    },
      backgroundColor: progressBarColors.yellow.secondary,
  },
  weak: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: progressBarColors.red.primary,
    },
      backgroundColor: progressBarColors.red.secondary,
  },
});
  
export function PwStrengthProgress(props){
  const pwControl = new PasswordControl();
  const classes = useStyles(props);

  function changeColor(){
    if(pwControl.pwStrength(props.password) === 100)
        return classes.strong;
      else if(pwControl.pwStrength(props.password) === 50)
        return classes.medium;
      else 
        return classes.weak;
    }
  return(
      <LinearProgress 
        variant="determinate" 
        value={pwControl.pwStrength(props.password)} 
        className={changeColor()}
      />
  );
}