import React from 'react';

import { AppBar } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';

import { sidebarStyles } from '../sidebar/sidebar_styles'

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

export function DynamicAppbar(props) {
  const classes = sidebarStyles();
  
  function getSection(section){
    if(section === null)
      return null;
    return section.map((element, index) => (
      <Tooltip
        key={index}
        title={element.label}
        placement="bottom"
        arrow
      >
        <IconButton
          href={element.href}
        >
          {element.icon? element.icon : null}
          {element.avatar? element.avatar : null}
        </IconButton>                  
      </Tooltip>
    ))
  }

  return (
    <AppBar 
      position={props.appBarPosition} 
    >
      <Hidden //Smartphone
        smUp 
        implementation="css"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.menuOnClick}
            className={classes.menuButton}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Grid
            container
            justify="center"
          >
            {props.centerAppBar}
          </Grid>
        </Toolbar>  
      </Hidden>

      <Hidden //Pc
        xsDown 
        implementation="css"
        className={props.width ? classes.fullPadding : classes.restrictedPadding}
      >
        <Toolbar
          style={{
            width: "100%"
          }}
        >
          {getSection(props.leftAppBar)}
          <Grid
            container
            justify="center"
          >
            {props.centerAppBar}
          </Grid>
          {getSection(props.rightAppBar)}
        </Toolbar>
      </Hidden>
    </AppBar>
  );
}