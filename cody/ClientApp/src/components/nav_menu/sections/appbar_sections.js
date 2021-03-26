import React from 'react';
import { Hidden } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { SearchBar } from '../../pickers/search_bars/search_bar/search_bar';
import { CompressedSearchBar } from '../../pickers/search_bars/compressed_search_bar/compressed_search_bar';
import { UserAvatarIcon } from '../../interactive_icons/user_avatar_icon/user_avatar_icon';
import { NotificationsIcon } from '../../interactive_icons/notifications_icon';

const leftAppBar = [
  {  
    label: "Cerca",
    tooltip: false,
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
      <SearchBar
        disableTooltipsOnMobile
      />
    </Hidden>
  </Box>
); 


const rightAppBar = [
  {
    tooltip: false,
    element: (<NotificationsIcon/>),
    showAlways: true,
  },
  {
    tooltip: false,
    element: (<UserAvatarIcon/>),
    showAlways: true,
  },
]

export const appBarSections = {
  left: leftAppBar,
  center: centerAppBar,
  right: rightAppBar,
}
