import React from 'react';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { PageController } from 'src/lib/page_controller';
import { MenuItemBase } from 'src/components/bases/items/menu_item_base';

export const AccountMenuItem =  React.forwardRef((props, ref) => {  
  return (
    <MenuItemBase
      ref={ref}
      component="a"
      href="/account"
      onClick={(e) => {
        PageController.push('/account', e)
        props.onClose()
      }}
      icon={AccountCircleRoundedIcon}
      label="Account"
    />
  );
})