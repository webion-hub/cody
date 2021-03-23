import React, { useEffect } from 'react';

import { Drawer } from '@material-ui/core';
import { SwipeableDrawer  } from '@material-ui/core';
import { Hidden } from '@material-ui/core';

import { useMediaQuery } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

import { useSidebarStyles } from './styles/sidebar_styles'
import { DrawerList } from './components/drawer_list/drawer_list'
import { DynamicAppbar } from '../appbar/dynamic_appbar'

export function SideBar(props) {
  const classes = useSidebarStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);

  useEffect(() => {
    if(mobileView)
      setFullWidth(false);
    else 
      setMobileOpen(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);
  
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

  const drawerList =
    <DrawerList
      onSidebarClose={() => {
        mobileView ? setMobileOpen(false) : setFullWidth(false)
      }}
      sections={props.sideBarSections}
      appBarSections={getAppBarSections()}
    />

  const mobileContent =         
    <Hidden
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

  const pcContent =
    <Hidden
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

  return (
    <div className={classes.root}>

      <DynamicAppbar
        menuOnClick={() => {
          mobileView ? 
            handleDrawerToggle() : handleFullWidth()
        }}
        appBarPosition={props.appBarPosition}
        sections={props.appBarSections}
        fadeSections={props.fadeSections}
      />

      <nav className={classes.drawer} aria-label="mailbox folders">
        {mobileContent}
        {pcContent}
      </nav>

      <main className={classes.content}>
        <div 
          className={classes.children}
        >
          {props.children}  
        </div> 
      </main>

    </div>
  );
}