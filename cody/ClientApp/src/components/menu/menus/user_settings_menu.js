import React from "react";
import { IconButton } from '@material-ui/core'

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { useMenu } from "src/lib/hooks/use_menu";
import { ReportMenuItem } from "src/components/menu/menu_items/report_menu_item";
import { MenuWithLoading } from "src/components/menu/menu_with_loading";
import { KickUserMenuItem } from "src/components/menu/menu_items/kick_user_menu_item";
import { EditRoleMenuItem } from "src/components/menu/menu_items/edit_role_menu_item";

export function UserSettingsMenu({user, callerIs, className}){
  const {
    handleOpenMenu,
    handleCloseMenu,
    isMenuOpen,
  } = useMenu()

  return (
    <>
      <IconButton
        className={className}
        onClick={handleOpenMenu}
      >
        <MoreVertRoundedIcon fontSize="small"/>
      </IconButton>
      <MenuWithLoading
        anchorEl={isMenuOpen}
        open={Boolean(isMenuOpen)}
        onClose={handleCloseMenu}
      >
        <EditRoleMenuItem
          hide={callerIs === "User"}
          id={user.id}
          onMenuClose={handleCloseMenu}
        />
        <KickUserMenuItem
          hide={callerIs === "User"}
        />
        <ReportMenuItem/>
      </MenuWithLoading>  
    </>  
  )
} 