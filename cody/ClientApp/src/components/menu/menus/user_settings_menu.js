import React from "react";
import IconButton from '@material-ui/core/IconButton'

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { useMenu } from "src/lib/hooks/use_menu";
import { ReportMenuItem } from "src/components/menu/menu_items/report_menu_item";
import { MenuWithLoading } from "src/components/menu/menu_with_loading";
import { KickUserMenuItem } from "src/components/menu/menu_items/kick_user_menu_item";
import { EditRoleMenuItem } from "src/components/menu/menu_items/edit_role_menu_item";

export function UserSettingsMenu(props){
  const {
    userId,
    callerIs,
    className,
    handler,
    onUserUpdate
  } = props

  const [loading, setLoading] = React.useState(false)

  const {
    handleOpenMenu,
    handleCloseMenu,
    isMenuOpen,
  } = useMenu()

  const user = handler.user(userId)

  if(callerIs === "noMember")
    return null;

  return (
    <>
      <IconButton
        className={className}
        onClick={handleOpenMenu}
      >
        <MoreVertRoundedIcon fontSize="small"/>
      </IconButton>
      <MenuWithLoading
        loading={loading}
        anchorEl={isMenuOpen}
        open={Boolean(isMenuOpen)}
        onClose={handleCloseMenu}
        keepMounted
      >
        <EditRoleMenuItem
          hide={callerIs === "User"}
          handler={user}
          setLoading={setLoading}
          onEditRole={onUserUpdate}
  				onMenuClose={handleCloseMenu}
        />
        <KickUserMenuItem
          hide={callerIs === "User"}
          handler={user}
          setLoading={setLoading}
          onKickUser={onUserUpdate}
        />
        <ReportMenuItem/>
      </MenuWithLoading>  
    </>  
  )
} 