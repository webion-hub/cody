import React from "react";
import { IconButton } from '@material-ui/core'

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { useMenu } from "src/lib/hooks/use_menu";
import { ReportMenuItem } from "src/components/menu/menu_items/report_menu_item";
import { MenuWithLoading } from "src/components/menu/menu_with_loading";
import { KickUserMenuItem } from "src/components/menu/menu_items/kick_user_menu_item";
import { EditRoleMenuItem } from "src/components/menu/menu_items/edit_role_menu_item";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    zIndex: `${theme.zIndex.tooltip + 1} !important`
  }
}));

export function UserSettingsMenu(props){
	const classes = useStyles();

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
    anchor
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
        anchorEl={anchor}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        PopoverClasses={{
          root: classes.popover,
        }}
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