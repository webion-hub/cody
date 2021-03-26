import React from 'react';

import { MenuItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { PageController } from 'src/lib/page_controller';

export const AccountMenuItem =  React.forwardRef((props, ref) => {  
  return (    
    <MenuItem
      ref={ref}
      href="/account"
      onClick={(e) => {
        PageController.push('/account', e)
        props.onClose()
      }}
    >
      <ListItemIcon>
        <AccountCircleRoundedIcon fontSize="small"/>
      </ListItemIcon>
      <Typography variant="inherit" noWrap>
        Account
      </Typography>
    </MenuItem>
  );
})