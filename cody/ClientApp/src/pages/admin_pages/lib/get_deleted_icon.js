import React from 'react';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';

export const getDeletedIcon = (hasBeenDeleted) => {
  return hasBeenDeleted ?
    <PauseRoundedIcon fontSize="small"/>
    : 
    <PlayArrowRoundedIcon fontSize="small"/>

}