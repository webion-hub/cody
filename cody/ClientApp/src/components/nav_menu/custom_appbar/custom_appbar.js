import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import { useScrollTrigger } from '@material-ui/core';
import { Slide } from '@material-ui/core';

import { AppBarSection } from './components/appbar_section';
import { useListener } from 'src/lib/hooks/use_listener';
import { AppBarOpacityController } from './lib/appbar_opacity_controller';
import { STDEventsDispatcher } from 'src/lib/std_events_dispatcher';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';


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
  const mobileView = useMobileView()
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

  useListener({
    controller: STDEventsDispatcher.setEvent('scroll').on(window),
    eventFunction: _ => AppBarOpacityController
      .setRef(appBarRef)
      .updateOpacity(theme.appBar.color)
  }, [theme])

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
          elevation={0}
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