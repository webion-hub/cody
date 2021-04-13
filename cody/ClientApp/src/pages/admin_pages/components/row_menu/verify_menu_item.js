import React from 'react';

import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import { MenuItemBase } from '../../../../components/menu/menu_item_base';

export const VerifyMenuItem = React.forwardRef((props, ref) => {
  if(props.hide)
    return null;

	return (
    <MenuItemBase
      ref={ref}
      onClick={props.onVerify}
      disabled={props.disabled}
      icon={BeenhereRoundedIcon}
      label="Verifica"
    />
	);
})