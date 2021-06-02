import React from 'react';

import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';

export const getVerificationIcon = (hasBeenVerified) => {
  return hasBeenVerified ? 
    <BeenhereRoundedIcon fontSize="small"/> 
    : 
    <TimerRoundedIcon fontSize="small"/>
}