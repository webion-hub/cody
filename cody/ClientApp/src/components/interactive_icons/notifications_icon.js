import React from 'react';
import { IconButton } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { UserContext } from '../user_controller_context';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

const useStyles = makeStyles((theme) => ({
  notificationsButton: {
    width: 40,
    height: 40,
    margin: 4,
  },
  skeleton: {
    margin: 4,
  },
}));

export function NotificationsIcon(){
  const classes = useStyles();
  const { logged } = React.useContext(UserContext);
  const { loading } = React.useContext(UserContext);
  
  return (
    <div>
      <Skeleton
        variant="circle" 
        width={40} 
        height={40} 
        className={classes.skeleton}
        style={{
          display: loading ? "block" : "none"  
        }}
      />
      {
        logged ? (
          <div>
            <div
              style={{
                display: logged ? "block" : "none"
              }}
            >
              <Tooltip
                arrow
                title="Notifiche"
              >
                <IconButton aria-label="delete" className={classes.notificationsButton}>
                  <Badge 
                    color="secondary" 
                    badgeContent={22}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                      <NotificationsRoundedIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ) : (
          null
        )
      }
    </div>
  );
}