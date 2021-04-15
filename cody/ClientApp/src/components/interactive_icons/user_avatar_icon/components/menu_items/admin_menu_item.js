import React from 'react';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';

import { PageController } from 'src/lib/page_controller';
import { MenuItemBase } from 'src/components/menu/menu_items/menu_item_base';

export const AdminMenuItem =  React.forwardRef((props, ref) => {  
  if(props.isAdmin)    
    return (
      <MenuItemBase
        ref={ref}
        component="a"
        href="/admin"
        onClick={(e) => {
          PageController.push('/admin', e)
          props.onClose()
        }}
        icon={SupervisorAccountRoundedIcon}
        label="Admin"
      />
    );
  
  return null;
})