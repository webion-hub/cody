import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { CustomAvatar } from 'src/components/custom_avatar';
import { TouchableTooltip } from 'src/components/touchable_tooltip'

import { UserAccountInfo } from 'src/lib/server_calls/user_account_info'

import { AccountMenuItem } from './menu_items/account_menu_item';
import { AdminMenuItem } from './menu_items/admin_menu_item';
import { LogoutMenuItem } from './menu_items/logout_menu_item';

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

  const { userState, setUserState } = React.useContext(UserContext);  
  const { role } = React.useContext(UserContext);
  const isAdmin = role === "Admin"

  const [openMenu, setOpenMenu] = React.useState(null);
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

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  return (    
    <> 
      <TouchableTooltip
        arrow
        title="Account"
      >
        <IconButton
          className={classes.avatarButton}
          onClick={handleClick}
          classes={{
            root: classes.iconButton
          }}
        >
          <CustomAvatar
            alt={username}
            src="user/profile_picture" 
          />
        </IconButton>
      </TouchableTooltip>
      <Menu
        id="simple-menu"
        anchorEl={openMenu}
        keepMounted
        open={Boolean(openMenu)}
        onClose={handleClose}
      >
        <AccountMenuItem
          onClose={handleClose}
        />
        <AdminMenuItem
          isAdmin={isAdmin}
          onClose={handleClose}
        />
        <LogoutMenuItem
          onClose={handleClose}
          setUserState={setUserState}
        />
      </Menu>
    </>
  );
}