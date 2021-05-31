import React from "react";
import { MenuItemBase } from "src/components/bases/items/menu_item_base";

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { LeaveOrganizationButton } from "src/components/buttons/leave_organization_button/leave_organization_button";

export const LeaveOrganizationtMenuItem =  React.forwardRef((props, ref) => {
  const {
    organizationData,
    callerIs,
    onClose,
    hide
  } = props

  if(callerIs === "noMember")
    return null
    
  return (
    <LeaveOrganizationButton
      organization={organizationData}
      ButtonComponent={MenuItemBase}
      customComponentProps={{
        ref: ref,
        color: "error",
        icon: ExitToAppRoundedIcon,
        onClick: onClose,
        hide: hide
      }}
    />
  );
})