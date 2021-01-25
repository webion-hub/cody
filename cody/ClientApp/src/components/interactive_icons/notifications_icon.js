import React from 'react';
import { IconButton } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { UserContext } from '../user_controller_context'; 

import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

export function NotificationsIcon(){
  const { logged } = React.useContext(UserContext);

  return (
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
  );
}