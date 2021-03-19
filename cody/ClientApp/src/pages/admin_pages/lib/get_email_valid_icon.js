import React from 'react';

import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';

export const getEmailValidIcon = (isEmailValid) => {
  return isEmailValid ?
    <VerifiedUserRoundedIcon fontSize="small"/>
    : 
    <TimerRoundedIcon fontSize="small"/>
}