import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { PageController } from 'src/lib/page_controller';

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
      paddingLeft: 0,
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
  const [openSidebar, setOpenSidebar] = React.useState(false);

  useEffect(() => {
    setOpenSidebar(!mobileView)
  }, [mobileView])

  const unListen = PageController.listen(() => {
		setOpenSidebar(false)
	})

  useEffect(_ => {
    return _ => unListen()
  }, [])

  const children = 
    <main className={classes.content}>
      <div className={classes.children}>
        {props.children}
      </div>
    </main>

  return (
    <div className={classes.root}>
      <props.appBar
        toggleMobileDrawer={() => setOpenSidebar(!openSidebar)}
        appBarElements={props.appBarElements}
      >
        <props.sideBar
          sideBarItems={props.sideBarItems}
          openSidebar={openSidebar}
          onSidebarOpen={() => setOpenSidebar(true)}
          onSidebarClose={() => setOpenSidebar(false)}
        >
          {children}
        </props.sideBar>
      </props.appBar>
    </div>
  )
}