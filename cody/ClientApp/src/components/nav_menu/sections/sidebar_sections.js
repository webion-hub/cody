import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';

export const sideBarSections = [
    [
      {
        label: 'Home',
        icon: (<HomeRoundedIcon />),
        href: "/"
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
        href: "/login"
      },
    ],    
  ]