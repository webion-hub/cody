import React from 'react';

import { MenuItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';

import { User } from 'src/lib/server_calls/user';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

export const LogoutMenuItem =  React.forwardRef((props, ref) => {   
  return ( 
    <MenuItem
      onClick={() => {
        props.onClose()
        props.setUserState("loading")
        User.logout({
          onSuccess: () => props.setUserState("notLogged"),
          onError: () => props.setUserState("notLogged"),
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