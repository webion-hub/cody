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
import { useMediaQuery } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const dynamicAppbarStyles = makeStyles((theme) => ({
  rightSection: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  leftSection: {
    display: "flex",
    alignItems: "center"
  },
  toolbar: {
    paddingLeft: 0
  },
  toolbarGrid: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 24
    },
  }
}));


export function DynamicAppbar(props) {
  const classes = dynamicAppbarStyles();

  function getMainContent(element){
    return <div>
      {
        element.element? (
          element.element
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
    </div>
  }
  
  function getSection(section){
    if(section === null)
      return null;
    return section.map((element, index) => (
      <Hidden //Pc
        key={index}
        xsDown={!element.showAlways}
        implementation="css"
      >
        {
          element.tooltip ? (
            getMainContent(element)
          ):(
            <Tooltip
              title={element.label?element.label : ""}
              placement="bottom"
              arrow
            >
              {getMainContent(element)}               
            </Tooltip>
          )
        }
      </Hidden>
    ))
  }

  const trigger = useScrollTrigger({ target: props.window ? window() : undefined }); //hide on scroll
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Slide appear={false} direction="down" in={mobileView ? !trigger : true}>
      <AppBar 
        position={props.appBarPosition}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            aria-label="open drawer"
            onClick={props.menuOnClick}
            className={classes.menuButton}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Grid
            container 
            className={classes.toolbarGrid}
          >
            <Grid item xs={3} className={classes.leftSection}>
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