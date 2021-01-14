import React from 'react';
import { Avatar } from '@material-ui/core';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

export const sections = [
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
      {
        label: 'Notifiche',
        icon: (<NotificationsRoundedIcon />)
      },
    ],
    [
      {
        label: 'Account',
        avatar: (
          <Avatar 
            alt="Profile Image" 
            src="/images/bulb.jpeg" 
            style={{
              width: 36,
              height: 36,
            }}
          />
        ),
        avatarPadding: 6,
      },
      {
        label: 'Esci',
        icon: (<ExitToAppRoundedIcon />),
        href: "/login"
      },
    ],    
  ]