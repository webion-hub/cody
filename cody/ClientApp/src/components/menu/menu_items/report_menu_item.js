import React from "react";
import { MenuItemBase } from "src/components/bases/items/menu_item_base";

import ReportRoundedIcon from '@material-ui/icons/ReportRounded';

export const ReportMenuItem =  React.forwardRef((props, ref) => {   
  return ( 
    <MenuItemBase
      disabled={props.disabled}
      hide={props.hide}
      ref={ref}
      onClick={_ => {}}
      icon={ReportRoundedIcon}
      label="Segnala"
    />
  );
})