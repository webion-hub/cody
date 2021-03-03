import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';

import history from 'src/history'
import { CustomAvatar } from 'src/components/custom_avatar';

export const sideBarSections = [
    {
      label: 'Home',
      icon: (<HomeRoundedIcon />),              
      onClick: () => history.push('/'),
    },
    {
      label: 'Classi',
      icon: (<SchoolRoundedIcon />),
      onClick: () => history.push('/class'),
    },
    {
      divider: true,
      label: 'Crea o unisciti',
      icon: (<AddRoundedIcon />),
      onClick: () => history.push('/create_join_organization'),
    },
    {
      padding: 4,
      label: 'ITIS Fermi',
      icon: (<CustomAvatar src="images/bulb.jpeg"/>),
    }, 
  ]