import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
	children: {
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.drawer.width,
      width: "100%",
      transition: "all 0.25s",
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.drawer.width,
      width: "100%",
      transition: "all 0.25s",
      marginTop: theme.appBar.mobileHeight,
    },
  }
}));

export function NavMenu(props){
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const [openMobileDrawer, setOpenMobileDrawer] = React.useState(false);

  const children = 
    <main className={classes.content}>
      <div className={classes.children}>
        {props.children}
      </div>
    </main>

  return (
    <div className={classes.root}>
      <props.appBar
        toggleMobileDrawer={() => setOpenMobileDrawer(!openMobileDrawer)}
        appBarElements={props.appBarElements}
      >
        {
          mobileView ? 
            <props.sideBarOnMobile
              onOpenMobileDrawer={() => setOpenMobileDrawer(true)}
              onCloseMobileDrawer={() => setOpenMobileDrawer(false)}
              openMobileDrawer={openMobileDrawer}
              sideBarItems={props.sideBarItems}
            >
              {children}
            </props.sideBarOnMobile>
            :
            <props.sideBar
              sideBarItems={props.sideBarItems}
            >
              {children}
            </props.sideBar>
        }
      </props.appBar>
    </div>
  )
}