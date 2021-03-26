import React from 'react';

import { MenuItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';

import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';

import { PageController } from 'src/lib/page_controller';

export const AdminMenuItem =  React.forwardRef((props, ref) => {  
  if(props.isAdmin)    
    return (    
      <MenuItem
        component="a"
        href="/admin"
        onClick={(e) => {
          PageController.push('/admin', e)
          props.onClose()
        }}
      >
        <ListItemIcon>
          <SupervisorAccountRoundedIcon fontSize="small"/>
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          Admin
        </Typography>
      </MenuItem>
    );
  
  return null;
})