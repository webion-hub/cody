import React from 'react';
import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';

import { TouchableTooltip } from 'src/components/touchable_tooltip';

export const getVerificationIcon = (hasBeenVerified) => {
  return hasBeenVerified ? 
    <TouchableTooltip arrow title="Verificato">
      <BeenhereRoundedIcon fontSize="small"/> 
    </TouchableTooltip>
    : 
    <TouchableTooltip arrow title="Non verificato">
      <TimerRoundedIcon fontSize="small"/>
    </TouchableTooltip>
}