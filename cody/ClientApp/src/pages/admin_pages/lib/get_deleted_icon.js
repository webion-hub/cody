import React from 'react';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';

import { TouchableTooltip } from 'src/components/touchable_tooltip';

export const getDeletedIcon = (hasBeenDeleted) => {
  return hasBeenDeleted ?
    <TouchableTooltip arrow title="Rimosso">
      <PauseRoundedIcon fontSize="small"/>
    </TouchableTooltip>
    : 
    <TouchableTooltip arrow title="In uso">
      <PlayArrowRoundedIcon fontSize="small"/>
    </TouchableTooltip>
}