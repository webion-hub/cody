import React from 'react';

import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { MenuItemBase } from '../../../../components/menu/menu_item_base';

export const DeleteMenuItem = React.forwardRef((props, ref) => {
  if(props.hide)
    return null;

	return (
    <MenuItemBase
      ref={ref}
      onClick={props.onDelete}
      disabled={props.disabled}
      icon={DeleteRoundedIcon}
      label="Cancella"
    />
	);
})