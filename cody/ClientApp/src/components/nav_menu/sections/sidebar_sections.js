import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';

import history from 'src/history'

export const sideBarSections = [
    [
      {
        label: 'Home',
        icon: (<HomeRoundedIcon />),              
        onClick: () => history.push('/'),
      },
      {
        label: 'Classi',
        icon: (<SchoolRoundedIcon />)
      },
    ],
    [
      {
        label: 'Esci',
        icon: (<ExitToAppRoundedIcon />),
        onClick: () => history.push('/login'),
      },
    ],    
  ]