import React from 'react';

import { AppBar } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Slide } from '@material-ui/core';
import { useScrollTrigger } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Fade } from '@material-ui/core';

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import { makeStyles } from '@material-ui/core/styles';


export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

export const dynamicAppbarStyles = makeStyles((theme) => ({
  fullPadding: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: fullDrawerWidth,
      transition: "all 0.25s",
    }
  },
  restrictedPadding: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: restrictedWidth,
      transition: "all 0.25s",
    }
  },
  rightSection: {
    display: "flex",
    justifyContent: "flex-end"
  },
  leftSection: {
    display: "flex",
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));


export function DynamicAppbar(props) {
  const classes = dynamicAppbarStyles();
  
  function getSection(section){
    if(section === null)
      return null;
    return section.map((element, index) => (
      <Hidden //Pc
        key={index}
        xsDown={!element.showAlways}
        implementation="css"
      >
        <Tooltip
          title={element.label}
          placement="bottom"
          arrow
        >
          {
            element.element? (
              <div>
                {element.element}
              </div> 
            ):(
              <IconButton
                href={element.href}
                style={{
                  padding: element.padding
                }}
              >
                {element.icon? element.icon : null}
                {element.avatar? element.avatar : null}
              </IconButton>    
            )
          }                       
        </Tooltip>
      </Hidden>
    ))
  }

  const trigger = useScrollTrigger({ target: props.window ? window() : undefined }); //hide on scroll

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar 
        position={props.appBarPosition} 
        className={props.fullWidth ? classes.fullPadding : classes.restrictedPadding}
      >
        <Toolbar
          style={{
            width: "100%"
          }}          
        >
          <Grid
            container 
          >
            <Grid item xs={3} className={classes.leftSection}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={props.menuOnClick}
                className={classes.menuButton}
              >
                <MenuRoundedIcon />
              </IconButton>
              <Fade in={props.fadeLeft}>
                <div>
                  {getSection(props.leftAppBar)}
                </div>
              </Fade>
            </Grid>
            <Grid item xs={6}>
              <Fade in={props.fadeCenter}>
                <div>
                  {props.centerAppBar}
                </div>
              </Fade>              
            </Grid>
            <Grid item xs={3}>
              <Fade in={props.fadeRight}>
                <div className={classes.rightSection}>
                  {getSection(props.rightAppBar)}
                </div>
              </Fade>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}