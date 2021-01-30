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

import { UserContext } from '../user_controller_context';
import { User } from '../../lib/user';

const useStyles = makeStyles((theme) => ({
  avatarButton: {
    padding: 3,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  loginButton: {
    marginTop: 7
  },
  skeleton: {
    margin: 3
  }
}));

export function UserAvatarIcon(){  
  const classes = useStyles();
  const { logged, setLogged } = React.useContext(UserContext);
  const { loading } = React.useContext(UserContext);

  const [openMenu, setOpenMenu] = React.useState(null);

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  return (    
    <div>
      {
        loading ? (
          <Skeleton
            variant="circle" 
            width={45} 
            height={45} 
            className={classes.skeleton}
          />
        ):(
          <div>
            {
              logged ? (
                <div>
                  <Tooltip
                    arrow
                    title="Account"
                  >
                    <IconButton
                      className={classes.avatarButton}
                      onClick={handleClick}
                    >
                      <Avatar alt="Avatar" src="/images/bulb.jpeg" />
                    </IconButton>
                  </Tooltip>
      
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
              )
            }
          </div>
        )
      }
    </div>
  );
}