import React from 'react';
import { Avatar } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { SearchBar } from '../../search_bar/search_bar';
import { CompressedSearchBar } from '../../search_bar/compressed_search_bar';

import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';


const leftAppBar = null;

const centerAppBar =  (
  <Box width={1}>
    <Hidden //Smartphone
      smUp 
    >
      <CompressedSearchBar/>
    </Hidden>    
    <Hidden //PC
      xsDown 
    >
      <SearchBar />
    </Hidden>
  </Box>
); 


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

