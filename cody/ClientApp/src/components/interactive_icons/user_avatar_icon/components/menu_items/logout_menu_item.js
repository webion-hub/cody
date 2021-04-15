import React from 'react';
import { User } from 'src/lib/server_calls/user';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { MenuItemBase } from 'src/components/menu/menu_items/menu_item_base';

export const LogoutMenuItem =  React.forwardRef((props, ref) => {   

  const handleLogout = () => {
    props.onClose()
    props.setUserState("loading")
    User.logout({
      onSuccess: () => props.setUserState("notLogged"),
      onError: () => props.setUserState("notLogged"),
    })
  }

  return ( 
    <MenuItemBase
      ref={ref}
      onClick={handleLogout}
      icon={ExitToAppRoundedIcon}
      label="Logout"
    />
  );
})