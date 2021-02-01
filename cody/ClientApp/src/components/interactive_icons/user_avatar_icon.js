import React from 'react';
import { Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { UserContext } from 'src/components/user_controller_context';
import { User } from 'src/lib/user';

const useStyles = makeStyles((theme) => ({
  avatarButton: {
    width: 40,
    height: 40,
    margin: 4,
  },
  skeleton: {
    margin: 4,
  },
  loginButton: {
    marginTop: 7
  },
}));

export function UserAvatarIcon(){  
  const classes = useStyles();
  const { logged, setLogged } = React.useContext(UserContext);
  const { loading } = React.useContext(UserContext);

  const [openMenu, setOpenMenu] = React.useState(null);
  const [loadingAvatar, setLoadingAvatar] = React.useState(true);
  
  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };
  return (    
    <div>
      <Skeleton
        variant="circle" 
        animation="wave"
        width={40} 
        height={40} 
        className={classes.skeleton}
        style={{
          display: (logged && loadingAvatar) || loading ? "block" : "none"  
        }}
      />
      {
        logged ? (
          <div>
            <div
              style={{
                display: loadingAvatar ? "none" : "block"
              }}
            >
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
                    onLoad={() => setLoadingAvatar(false)}
                    onError={() => setLoadingAvatar(false)}
                  />
                </IconButton>
              </Tooltip>
            </div>  
            <Menu
              id="simple-menu"
              anchorEl={openMenu}
              keepMounted
              open={Boolean(openMenu)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {}}>
                <ListItemIcon>
                  <AccountCircleRoundedIcon fontSize="small"/>
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  Account
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                handleClose();
                User.logout({
                  onSuccess: () => {setLogged(false)},
                  onError: () => {},
                });
              }}>
                <ListItemIcon>
                  <ExitToAppRoundedIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        ):(
          <div
            style={{
              display: loading ? "none" : "block" 
            }}
          >
            <Tooltip
              arrow
              title="Accedi"
            >
              <Button
                className={classes.loginButton}
                href="/login"
              >
                Login
              </Button>
            </Tooltip>
          </div>
        )
      }
    </div>
  );
}