import React from 'react';

import { UserAvatarIcon } from 'src/components/interactive_icons/user_avatar_icon/user_avatar_icon';
import { NotificationsIcon } from 'src/components/interactive_icons/notifications_icon';

import { SearchBar } from 'src/components/pickers/search_bars/search_bar/search_bar';

export const appBarElements = {
  left: null,
  center: <SearchBar/>,
  right:
    <>
      <NotificationsIcon/>
      <UserAvatarIcon/> 
    </>
}