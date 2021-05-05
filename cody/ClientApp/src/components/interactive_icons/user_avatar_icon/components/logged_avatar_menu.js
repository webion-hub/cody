import React, { useEffect } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import { Menu } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { CustomAvatar } from 'src/components/custom_avatar';

import { UserAccountInfo } from 'src/lib/server_calls/user_account_info'

import { AccountMenuItem } from './menu_items/account_menu_item';
import { AdminMenuItem } from './menu_items/admin_menu_item';
import { LogoutMenuItem } from './menu_items/logout_menu_item';
import { useMenu } from 'src/lib/hooks/use_menu';
import { profileImage } from 'src/lib/default_values/profile_constants/profile_image';

const useStyles = makeStyles((theme) => ({
  avatarButton: {
    width: 40,
    height: 40,
    margin: 4,
  },
  iconButton: {
    padding: 0,
  }
}));

export function LoggedAvatarMenu(){  
  const classes = useStyles();
  const {
    handleOpenMenu,
    handleCloseMenu,
    isMenuOpen,
  } = useMenu()

  const { userState, setUserState } = React.useContext(UserContext);  
  const { role } = React.useContext(UserContext);
  const isAdmin = role === "Admin"

  const [username, setUsername] = React.useState(null);
  
  useEffect(() => {
    if(userState === "logged"){
      UserAccountInfo
      .createRequest()
        .get('username')
      .send()
      .then(resp => {
        const got = resp.got;
        setUsername(got.get('username'));
      })
    }
  }, [userState])

  return (    
    <> 
      <Tooltip
        arrow
        title="Account"
      >
        <IconButton
          className={classes.avatarButton}
          onClick={handleOpenMenu}
          classes={{
            root: classes.iconButton
          }}
        >
          <CustomAvatar
            alt={username}
            src={profileImage}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={isMenuOpen}
        open={Boolean(isMenuOpen)}
        keepMounted
        onClose={handleCloseMenu}
      >
        <AccountMenuItem
          onClose={handleCloseMenu}
        />
        <AdminMenuItem
          isAdmin={isAdmin}
          onClose={handleCloseMenu}
        />
        <LogoutMenuItem
          onClose={handleCloseMenu}
          setUserState={setUserState}
        />
      </Menu>
    </>
  );
}