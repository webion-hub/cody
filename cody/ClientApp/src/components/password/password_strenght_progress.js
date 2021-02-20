import React from 'react';

import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PasswordController } from 'src/lib/format_controller/password_controller';

const progressBarColors = {
  green: {
    primary: "rgb(51, 204, 51)",
    secondary: "rgba(102, 255, 153, 0.25)"
  },
  yellow: {
    primary: "rgb(255, 204, 0)",
    secondary: "rgba(255, 255, 153, 0.25)"
  },
  orange: {
    primary: "rgb(255, 153, 51)",
    secondary: "rgba(255, 230, 204, 0.25)"
  },
  red: {
    primary: "rgb(255, 80, 80)",
    secondary: "rgba(255, 153, 153, 0.25)"
  }
}

const useStyles = makeStyles({
  veryStrong: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: progressBarColors.green.primary,
    },
      backgroundColor: progressBarColors.green.secondary,
  },

  strong: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: progressBarColors.yellow.primary,
    },
      backgroundColor: progressBarColors.yellow.secondary,
  },

  medium: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: progressBarColors.orange.primary,
    },
      backgroundColor: progressBarColors.orange.secondary,
  },  
  
  weak: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: progressBarColors.red.primary,
    },
      backgroundColor: progressBarColors.red.secondary,
  },
});
  
export function PwStrengthProgress(props){
  const pwControl = new PasswordController();
  const classes = useStyles(props);

  function changeColor(){
    const strength = pwControl.pwStrength(props.password)

    switch(strength){
      case 0:
        return classes.weak;
      case 25:
        return classes.weak;
      case 50:
        return classes.medium;
      case 75:
        return classes.strong;
      case 100:
        return classes.veryStrong;
      default:
        return 0;
    }
  }

  return(
      <LinearProgress 
        variant="determinate" 
        value={pwControl.pwStrength(props.password)} 
        className={changeColor()}
      />
  );
}