import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import { MenuRounded, PersonRounded } from '@material-ui/icons';


export class NavMenu extends Component {
  static displayName = NavMenu.name;
  
  render () {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuRounded/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <IconButton color="inherit">
            <PersonRounded/>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
