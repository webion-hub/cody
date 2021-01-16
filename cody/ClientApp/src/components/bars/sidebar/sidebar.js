import React from 'react';
import PropTypes from 'prop-types';

import { AppBar } from '@material-ui/core';
import { Drawer  } from '@material-ui/core';
import { SwipeableDrawer  } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

import { sidebarStyles } from './sidebar_styles'
import { getDrawer } from './drawer'

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

export function SideBar(props) {
  const classes = sidebarStyles();
  const theme = useTheme();
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };  

  const handleFullWidth = () => {
    setFullWidth(!fullWidth);
  };

  const drawer = getDrawer(
    classes,
    handleFullWidth,
    props.sections,
    fullWidth,
  );

  return (
    <div className={classes.root}>
      <AppBar 
        position={props.appbarPosition} 
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuRoundedIcon />
          </IconButton>
          {/* Appbar section */}
          <div
            style={{
              width: "100vw",
              position: "absolute",
              left: 0,
            }}
          >
            <Hidden //Smartphone
              smUp 
              implementation="css"
            >
              {props.appBar}
            </Hidden>
          </div>
          <div
            style={{
              width: "100%"
            }}
          >
            <Hidden //Pc
              xsDown 
              implementation="css"
              className={fullWidth ? classes.fullPadding : classes.restrictedPadding}
            >
              {props.appBar}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* Drawer section */}
        <Hidden //Smartphone
          smUp 
          implementation="css"
        >
          <SwipeableDrawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
            classes={{
              paper: classes.fullDrawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden //PC
          xsDown 
          implementation="css"
        >
          <Drawer
            classes={{
              paper: fullWidth ? classes.fullDrawerPaper : classes.restrictedDrawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {/* Content section */}
        <Hidden //Smartphone
          smUp 
          implementation="css"
        >
          {props.children}  
        </Hidden>
        <Hidden //Pc
          xsDown 
          implementation="css"
          className={classes.restrictedPadding}
        >
          {props.children}  
        </Hidden>                
      </main>
    </div>
  );
}

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;