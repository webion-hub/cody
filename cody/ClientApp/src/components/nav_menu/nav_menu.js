import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PageController } from 'src/lib/page_controller';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
	children: {
    position: "relative",
    marginTop: theme.appBar.fullHeight,
    minHeight: `calc(100vh - ${theme.appBar.fullHeight}px)`,
    [theme.breakpoints.up('sm')]: {
      maxWidth: `calc(100vw - ${theme.drawer.width}px)`,
      marginLeft: theme.drawer.width,
      width: "100%",
      transition: "all 0.25s",
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      maxWidth: '100vw',
      width: "100%",
      transition: "all 0.25s",
      marginTop: theme.appBar.mobileHeight,
      minHeight: `calc(100vh - ${theme.appBar.mobileHeight}px)`,
    },
  }
}));

export function NavMenu(props){
  const classes = useStyles();
  const mobileView = useMobileView()
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