import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { PageController } from 'src/lib/page_controller';
import { getDrawerContent } from '../lib/get_drawer_content';

import { useTheme } from '@material-ui/core/styles';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';


const useStyles = makeStyles((theme) => ({
	sideBarDrawer: {
		background: theme.drawer.default,
    height: "100vh",
		transition: "0.25s width, 0.25s opacity",
	},
	drawerContent: {
		margin: theme.spacing(1),
	},
}));

export function CustomDrawer(props){
	const theme = useTheme();
	const mobileView = useMobileView()
  const classes = useStyles();

  const { userState } = React.useContext(UserContext);

	const isDrawerOpen = props.contentWidth !== 0;
	const sideBarItems = props.sideBarItems;

	useEffect(() => {
		props.onDrawerClose()
	},[userState, mobileView])

	const unListen = PageController.listen(() => {
		props.onDrawerClose()
	})

  useEffect(_ => {
    return _ => unListen()
  }, [])

	const getDrawerWidth = () => {
		const isDrawerOpenOnMobileView = isDrawerOpen && mobileView
		if(isDrawerOpenOnMobileView)
				return window.innerWidth - theme.drawer.width

		return props.contentWidth
	}

	const getDrawerOpacity = () => {
		if(isDrawerOpen)
			return 1;

		return 0;
	}

  return (
		<div
			className={classes.sideBarDrawer}
			style={{
				width: getDrawerWidth(),
				opacity: getDrawerOpacity(),
			}}
		>
			<div className={classes.drawerContent}>
				{getDrawerContent(sideBarItems,	props.contentId)}
			</div>
		</div>
  )
}