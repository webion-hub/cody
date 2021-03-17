import React from 'react';

import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';

import { TouchableTooltip } from 'src/components/touchable_tooltip';

export const getEmailValidIcon = (isEmailValid) => {
  return isEmailValid ?
    <TouchableTooltip arrow title="Email confermata">
      <VerifiedUserRoundedIcon fontSize="small"/>
    </TouchableTooltip>
    : 
    <TouchableTooltip arrow title="Non verificata">
      <TimerRoundedIcon fontSize="small"/>
    </TouchableTooltip>
}