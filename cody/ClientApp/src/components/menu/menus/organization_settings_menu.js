import React from "react";
import { IconButton } from "@material-ui/core";
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';

import { MenuWithLoading } from "src/components/menu/menu_with_loading";
import { ReportMenuItem } from "src/components/menu/menu_items/report_menu_item";
import { LeaveOrganizationtMenuItem } from "src/components/menu/menu_items/leave_organization_menu_item";
import { useMenu } from "src/lib/hooks/use_menu";

export function OrganizationSettingsMenu(props){
  const {
    handleOpenMenu,
    handleCloseMenu,
    isMenuOpen,
  } = useMenu()

  return (
    <>
      <IconButton
        disabled={props.loading}
        className={props.className}
        onClick={handleOpenMenu}  
      >
        <MoreHorizRoundedIcon/>
      </IconButton>
      <MenuWithLoading
        anchorEl={isMenuOpen}
        open={Boolean(isMenuOpen)}
        onClose={handleCloseMenu}
      >
        <ReportMenuItem/>
        <LeaveOrganizationtMenuItem
          organizationData={props.organizationData}
          onClose={handleCloseMenu}
        />
      </MenuWithLoading>
    </>
  )
}