import React from "react";
import { MenuItemBase } from "src/components/menu/menu_items/menu_item_base";

import ReportRoundedIcon from '@material-ui/icons/ReportRounded';

export const ReportMenuItem =  React.forwardRef((props, ref) => {   
  return ( 
    <MenuItemBase
      hide={props.hide}
      ref={ref}
      onClick={_ => {}}
      icon={ReportRoundedIcon}
      label="Segnala"
    />
  );
})