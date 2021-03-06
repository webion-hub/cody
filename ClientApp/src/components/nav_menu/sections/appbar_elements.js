import React from 'react';

import { UserAvatarIcon } from 'src/components/icon_buttons/user_avatar_icon/user_avatar_icon';
import { NotificationsIcon } from 'src/components/icon_buttons/notifications_icon';

import { SearchBar } from 'src/components/textfields/search_bars/search_bar/search_bar';

export const appBarElements = {
  left: null,
  center: <SearchBar/>,
  right:
    <>
      <NotificationsIcon/>
      <UserAvatarIcon/> 
    </>
}