import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';

import { CustomAvatar } from 'src/components/custom_avatar';

export const sideBarSections = [
    {
      label: 'Home',
      icon: (<HomeRoundedIcon />),
      href: '/',
    },
    {
      label: 'Classi',
      icon: (<SchoolRoundedIcon />),
      href: '/class',
    },
    {
      divider: true,
      label: 'Crea o unisciti',
      icon: (<AddRoundedIcon />),
      href: '/create_join_organization',
    },
    {
      padding: 4,
      label: 'ITIS Fermi',
      icon: (<CustomAvatar src="images/bulb.jpeg"/>),
    }, 
  ]