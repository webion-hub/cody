import React from 'react';
import { IconButton } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

import { InteractiveIconBase } from 'src/components/bases/interactive_icon_base';
import { TouchableTooltip } from 'src/components/touchable_tooltip';

const useStyles = makeStyles((theme) => ({
  notificationsButton: {
    width: 40,
    height: 40,
    margin: 4,
  },
}));

export function NotificationsIcon(){
  const classes = useStyles();
  
  return (
    <InteractiveIconBase
      loggedChildren={
        <TouchableTooltip
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
        </TouchableTooltip>
      }
    />
  );
}