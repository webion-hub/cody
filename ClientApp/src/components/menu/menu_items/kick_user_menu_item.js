import React from "react";
import { MenuItemBase } from "src/components/bases/items/menu_item_base";

import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

export const KickUserMenuItem =  React.forwardRef((props, ref) => {
  const kickUser = () => {
    props.setLoading(true)
    props.handler
      .remove()
      .then(_ => props.onKickUser?.("deleted"))
      .finally(_ => props.setLoading(false))
  }

  return ( 
    <MenuItemBase
      hide={props.hide}
      disabled={props.disabled}
      ref={ref}
      onClick={kickUser}
      icon={ClearRoundedIcon}
      label="Rimuovi utente"
    />
  );
})