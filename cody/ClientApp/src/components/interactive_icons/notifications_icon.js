import React from 'react';
import { IconButton } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { UserContext } from '../user_controller_context';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: 3
  }
}));

export function NotificationsIcon(){
  const classes = useStyles();
  const { logged } = React.useContext(UserContext);
  const { loading } = React.useContext(UserContext);
  
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
                <Tooltip
                  arrow
                  title="Notifiche"
                >
                  <IconButton aria-label="delete">
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
              ) : (
                null
              )
            }
          </div>
        )
      }
    </div>
  );
}