import React from 'react';

import { Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { UserContext } from 'src/components/user_controller_context';
import { InteractiveIconBase } from 'src/components/bases/interactive_icon_base';

import { User } from 'src/lib/user';

import history from 'src/history'

const useStyles = makeStyles((theme) => ({
  avatarButton: {
    width: 40,
    height: 40,
    margin: 4,
  },
  loginButton: {
    marginTop: 7
  },
}));

export function UserAvatarIcon(){  
  const classes = useStyles();

  const { logged, setLogged } = React.useContext(UserContext);

  const [openMenu, setOpenMenu] = React.useState(null);
  const [loadingAvatar, setLoadingAvatar] = React.useState(true);
  
  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };
  
  const loggedChildren = (
    <> 
      <Tooltip
        arrow
        title="Account"
      >
        <IconButton
          className={classes.avatarButton}
          onClick={handleClick}
        >
          <Avatar 
            alt="Avatar" 
            src="profile_picture" 
            imgProps={{
              onLoad: () => setLoadingAvatar(false),
              onError: () => setLoadingAvatar(false)
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={openMenu}
        keepMounted
        open={Boolean(openMenu)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            history.push('/account');
            handleClose();
          }}
        >
          <ListItemIcon>
            <AccountCircleRoundedIcon fontSize="small"/>
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Account
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            User.logout({
              onSuccess: () => setLogged(false),
              onError: () => setLogged(false),
            })
            .then(() => {
              handleClose();
              history.go(0);
            });
          }}
        >
          <ListItemIcon>
            <ExitToAppRoundedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )

  return (    
    <InteractiveIconBase 
      extraLoadingCondition={logged && loadingAvatar}
      customChildrenLoading={loadingAvatar}
      loggedChildren={loggedChildren}
      notLoggedChildren={
        <Tooltip
          arrow
          title="Accedi"
        >
          <Button
            className={classes.loginButton}
            onClick={() => history.push('/login')}
          >
            Login
          </Button>
        </Tooltip>
      }
    />
  );
}