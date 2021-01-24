import React from 'react';
import { Hidden } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { SearchBar } from '../../search_bar/search_bar';
import { CompressedSearchBar } from '../../search_bar/compressed_search_bar';
import { UserAvatar } from '../../user_avatar';

import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';


const leftAppBar = [
  {  
    label: "Cerca",
    element: (
      <Box width={1}>
        <Hidden //Smartphone
          smUp 
        >
          <CompressedSearchBar/>
        </Hidden>    
      </Box>
    ), 
    showAlways: true,
    padding: 0,   
  }
];

const centerAppBar =  (
  <Box width={1}> 
    <Hidden //PC
      xsDown 
    >
      <SearchBar />
    </Hidden>
  </Box>
); 


const rightAppBar = [
  {
    tooltip: false,
    element: (<UserAvatar/>),
    showAlways: true,
  },
]

export const appBarSections = {
  left: leftAppBar,
  center: centerAppBar,
  right: rightAppBar,
}

