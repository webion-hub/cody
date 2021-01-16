import React from 'react';
import { Avatar } from '@material-ui/core';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

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