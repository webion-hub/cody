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
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';

import { UserContext } from 'src/components/user_controller_context';
import { InteractiveIconBase } from 'src/components/bases/interactive_icon_base';
import { CustomAvatar } from 'src/components/custom_avatar';
import { TouchableTooltip } from 'src/components/touchable_tooltip'

import { UserAccountInfo } from 'src/lib/user_account_info'

import { User } from 'src/lib/user';
import { PageController } from 'src/lib/page_controller';

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

  const { isLogged, setIsLogged } = React.useContext(UserContext);  
  const { role } = React.useContext(UserContext);
  const isAdmin = role === "Admin"

  const [openMenu, setOpenMenu] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  

  useEffect(() => {
    if(isLogged){
      UserAccountInfo
      .createRequest()
        .get('username')
      .send()
      .then(resp => {
        const got = resp.got;
        setUsername(got.get('username'));
      })
    }
  }, [isLogged])

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };
  
  const loggedChildren = 
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
          component="a"
          href="/account"
          onClick={(e) => {
            PageController.push('/account', e)
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
        {
          isAdmin ? 
            <MenuItem
              component="a"
              href="/admin"
              onClick={(e) => {
                PageController.push('/admin', e)
                handleClose();
              }}
            >
              <ListItemIcon>
                <SupervisorAccountRoundedIcon fontSize="small"/>
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Admin
              </Typography>
            </MenuItem>
            : null
        }
        <MenuItem
          onClick={() => {
            User.logout({
              onSuccess: () => setIsLogged(false),
              onError: () => setIsLogged(false),
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
  
  const notLoggedChildren = 
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
        href="/login"
        className={classes.loginButton}
        onClick={(e) => PageController.push('/login', e)}
      >
        Login
      </Button>
    </TouchableTooltip> 

  return (    
    <InteractiveIconBase 
      loggedContent={loggedChildren}
      notLoggedContent={notLoggedChildren}
    />
  );
}