import React, { useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import { useMediaQuery } from '@material-ui/core';
import { useScrollTrigger } from '@material-ui/core';
import { Slide } from '@material-ui/core';

import { AppBarSection } from './components/appbar_section';
import { setOpacityColor } from 'src/lib/setOpacityColor';
import { useListener } from 'src/lib/hooks/use_listener';
import { EventsDispatcher } from 'src/lib/events_dispatcher';


const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1300,
    backdropFilter: "blur(10px)",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 24,
  },
  toolbar: {
    paddingLeft: 12,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.drawer.width
    },
  }
}));

export const FadeAppBarContext = React.createContext({
  fadeInAppBarSection: {
    left: true,
    center: true,
    right: true,
  },
  setFadeInAppBar: () => {}
});

export function CustomAppBar(props){
  const appBarRef = React.useRef();
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const trigger = useScrollTrigger(); //hide on scroll

  const [fadeInAppBarSection, setFadeInAppBar] = React.useState({
    left: true,
    center: true,
    right: true, 
  })

  const value = {
    fadeInAppBarSection,
    setFadeInAppBar,
  }

  const getOpacity = () => {
    const scrollY = window.scrollY
    const halfScreen = window.innerHeight / 2

    if(scrollY >= halfScreen)
      return 0.25;

    return 1 - (scrollY / halfScreen) + 0.25
  }

  const updateAppBarOpacity = () => {
    if(appBarRef.current === null || appBarRef.current === undefined)
      return

    appBarRef.current.style.backgroundColor = setOpacityColor(theme.appBar.color, getOpacity())
  }

  useListener({
    controller: EventsDispatcher.setEvent('scroll'),
    eventFunction: updateAppBarOpacity
  })

  const fadeLeft = fadeInAppBarSection.left
  const fadeCenter = fadeInAppBarSection.center || mobileView;
  const fadeRight = fadeInAppBarSection.right

  const sizeLeft = mobileView ? 4 : 3;
  const sizeCenter = 6;
  const sizeRight = mobileView ? 8 : 3;

  const appBarElements = props.appBarElements;

  const openDrawerIcon = mobileView && 
    <IconButton
      aria-label="open drawer"
      edge="start"
      className={classes.menuButton}
      onClick={props.toggleMobileDrawer}
    >
      <MenuIcon />
    </IconButton>

  return (
    <FadeAppBarContext.Provider value={value}>
      <Slide 
        appear={false} 
        direction="down" 
        in={mobileView ? !trigger : true}
      >
        <AppBar
          ref={appBarRef}
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            {openDrawerIcon}
            <Grid
              container
              direction="row"
            >
              <AppBarSection
                size={sizeLeft}
                fadeIn={fadeLeft}
                position="flex-start"
              >
                {appBarElements.left}
              </AppBarSection>
              <AppBarSection
                hide={mobileView}
                size={sizeCenter}
                fadeIn={fadeCenter}
                position="center"
              >
                {appBarElements.center}
              </AppBarSection>
              <AppBarSection
                size={sizeRight}
                fadeIn={fadeRight}
                position="flex-end"
              >
                {appBarElements.right}
              </AppBarSection>
            </Grid>
          </Toolbar>
        </AppBar> 
      </Slide>
      {props.children}
    </FadeAppBarContext.Provider>
  )
}