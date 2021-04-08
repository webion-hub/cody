import React from 'react';

import RestoreRoundedIcon from '@material-ui/icons/RestoreRounded';
import { MenuItemBase } from './menu_item_base';

export const RestoreMenuItem = React.forwardRef((props, ref) => {
  if(props.hide)
    return null;

	return (
    <MenuItemBase
      ref={ref}
      onClick={props.onRestore}
      disabled={props.disabled}
      icon={RestoreRoundedIcon}
      label="Ripristina"
    />
	);
})