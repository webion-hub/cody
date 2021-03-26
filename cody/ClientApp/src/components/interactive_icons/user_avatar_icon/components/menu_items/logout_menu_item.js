import React from 'react';

import { MenuItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';

import { User } from 'src/lib/user';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

export const LogoutMenuItem =  React.forwardRef((props, ref) => {   
  return ( 
    <MenuItem
      onClick={() => {
        props.onClose()

        User.logout({
          onSuccess: () => props.setIsLogged(false),
          onError: () => props.setIsLogged(false),
        })
      }}
    >
      <ListItemIcon>
        <ExitToAppRoundedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit" noWrap>
        Logout
      </Typography>
    </MenuItem>
  );
})