import React from 'react';
import { Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { Badge } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

const useStyles = makeStyles((theme) => ({
  avatarButton: {
    padding: 3,
  },
  avatar: {
    width: 42,
    height: 42,
  },
  loginButton: {
    marginTop: 7
  },
  notifications: {
    borderRadius: "50%",
    background: "rgba(255,255,255)",
    animation: '$example 1.2s infinite ease-in-out',
  },
  "@keyframes example": {
    "from": {
      boxShadow: "0px 0px 0px 0px rgba(255,255,255,1)",
    },
    "to": {
      boxShadow: "0px 0px 0px 4px rgba(255,255,255,0)",
    }
  }
}));

export function UserAvatar(){  
  const classes = useStyles();
  const logged = true;
  const notificationsNumber = 10;
  const notification = notificationsNumber > 0;

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
        logged ? (
          <div>
            <IconButton
              className={classes.avatarButton}
              onClick={handleClick}
            >
              <Tooltip
                arrow
                title="Account"
              >
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <div>
                      {
                        notification ? (
                          <NotificationsRoundedIcon 
                            className={classes.notifications} 
                            color="secondary"
                            fontSize="small" 
                          />
                        ) : null
                      }
                    </div>
                  }
                >
                  <Avatar alt="Avatar" src="/images/bulb.jpeg" />
                </Badge>
              </Tooltip>
            </IconButton>
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
              <MenuItem onClick={() => {}}>
                <ListItemIcon>
                  {
                    notification ? (
                      <Tooltip
                        arrow
                        placement="left"
                        title={`Hai ${notificationsNumber} notifiche`}
                      >
                        <NotificationsRoundedIcon 
                          color="secondary"
                          fontSize="small"
                          className={classes.notifications}
                        />
                      </Tooltip>
                    ):(
                      <NotificationsRoundedIcon fontSize="small"/>
                    )
                  }

                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  Notifiche
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => {}}>
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

  );
}