import React from "react";
import { MenuItemBase } from "src/components/menu/menu_items/menu_item_base";

import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

export const KickUserMenuItem =  React.forwardRef((props, ref) => {
  return ( 
    <MenuItemBase
      hide={props.hide}
      ref={ref}
      onClick={_ => {}}
      icon={ClearRoundedIcon}
      label="Rimuovi utente"
    />
  );
})