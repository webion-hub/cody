import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Drawer  } from '@material-ui/core';
import { SwipeableDrawer  } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { Backdrop } from '@material-ui/core';

import { useMediaQuery } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

import { sidebarStyles } from './sidebar_styles'
import { GetDrawerList } from './drawer_list'
import { DynamicAppbar } from '../appbar/dynamic_appbar'

export function SideBar(props) {
  const classes = sidebarStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);

  useEffect(() => {
    if(mobileView)
      setFullWidth(false);
    else 
      setMobileOpen(false);
  });
  
  const getAppBarSections = () => {
    const leftIsNull = props.appBarSections.left === null;
    const rightIsNull = props.appBarSections.right === null;

    if(leftIsNull && !rightIsNull)
      return [props.appBarSections.right]
    if(rightIsNull && !leftIsNull)
      return [props.appBarSections.left]
    if(leftIsNull && rightIsNull)
      return [];  
    if(!leftIsNull && !rightIsNull)
      return [
        props.appBarSections.left,
        props.appBarSections.right,
      ]
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };  

  const handleFullWidth = () => {
    setFullWidth(!fullWidth);
  };

  const drawerList = (
    <GetDrawerList
      onSidebarClose={() => {
        mobileView ? setMobileOpen(false) : setFullWidth(false)
      }}
      classes={classes}
      sections={props.sideBarSections}
      appBarSections={getAppBarSections()}
    />
  )

  return (
    <div className={classes.root}>
      <DynamicAppbar
        menuOnClick={() => {
          mobileView ? handleDrawerToggle() : handleFullWidth()
        }}
        appBarPosition={props.appBarPosition}
        leftAppBar={props.appBarSections.left}
        centerAppBar={props.appBarSections.center}
        rightAppBar={props.appBarSections.right}
        fadeLeft={props.fadeSections.left}
        fadeCenter={props.fadeSections.center}
        fadeRight={props.fadeSections.right}
        sections={props.sideBarSections}
      />
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
            className={classes.scrollableDrawer}
            classes={{
              paper: classes.fullDrawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerList}
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
            {drawerList}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>

        {/* Content section */}
        <div className={classes.children}>
          {props.children}  
        </div>   
                     
      </main>
    </div>
  );
}

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;