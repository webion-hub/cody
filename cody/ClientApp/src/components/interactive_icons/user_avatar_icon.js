import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { UserContext } from 'src/components/user_controller_context';
import { InteractiveIconBase } from 'src/components/bases/interactive_icon_base';
import { CustomAvatar } from 'src/components/custom_avatar';
import { TouchableTooltip } from 'src/components/touchable_tooltip'

import { UserAccountInfo } from 'src/lib/user_account_info'

import { User } from 'src/lib/user';

import history from 'src/history'

const useStyles = makeStyles((theme) => ({
  avatarButton: {
    width: 40,
    height: 40,
    margin: 4,
  },
  loginButton: {
    margin: 6
  },
  iconButton: {
    padding: 0,
  }
}));

export function UserAvatarIcon(){  
  const classes = useStyles();

  const { logged, setLogged } = React.useContext(UserContext);

  const [openMenu, setOpenMenu] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  
  useEffect(() => {
    if(logged){
      UserAccountInfo
      .createRequest()
        .get('username')
      .send()
      .then(resp => {
        const got = resp.got;
        setUsername(got.get('username'));
      })
    }
  }, [logged])

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };
  
  const loggedChildren = (
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
      loggedContent={loggedChildren}
      notLoggedContent={
        <TouchableTooltip
          arrow
          interactive
          title={
            <Typography 
              variant="caption"
            >
              Accedi o registrati
            </Typography>
          }
        >
          <Button
            className={classes.loginButton}
            onClick={() => history.push('/login')}
          >
            Login
          </Button>
        </TouchableTooltip>      
      }
    />
  );
}