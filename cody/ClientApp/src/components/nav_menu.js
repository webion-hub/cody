import React, { Component } from 'react';
import {Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ClassRoundedIcon from '@material-ui/icons/ClassRounded';

function AppBarItem(props){
  return (
    <Box
      mt={1}
      ml={1}
    >
      <Tooltip 
        title={          
          <Typography 
            variant="subtitle2" 
          >
            {props.title}
          </Typography>
        }
        aria-label={props.title}
        placement="right"              
        arrow
        interactive
      >
        <Fab color={props.color}>
          {props.icon}
        </Fab>
      </Tooltip>  
    </Box>
  );
}

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  
  render () {
    return (
      <Box
        position="fixed"
      >
        <Grid
          container
          direction="column"
        >
          <AppBarItem
            title="Home"
            color="primary"     
            icon={<HomeRoundedIcon />}     
          />              
           <AppBarItem
            title="Classi"
            color="secondary"     
            icon={<ClassRoundedIcon />}     
          />           
          <AppBarItem
            title="Account"
            color="secondary"     
            icon={<AccountCircleRoundedIcon />}     
          />                                 
        </Grid>
      </Box>
    );
  }
}
