import React from 'react';
import { SearchBar } from '../../search_bar';

import { Avatar } from '@material-ui/core';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';


const leftAppBar = null;

const centerAppBar = <SearchBar />

const rightAppBar = [
  {
    label: 'Notifiche',
    icon: (<NotificationsRoundedIcon />)
  },
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
]

export const appBarSections = {
  left: leftAppBar,
  center: centerAppBar,
  right: rightAppBar,
}

