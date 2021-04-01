import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { PageController } from 'src/lib/page_controller';
import { getDrawerContent } from '../lib/get_drawer_content';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
	sideBarDrawer: {
		background: theme.drawer.default,
    position: "fixed",
    height: "100vh",
		marginLeft: theme.drawer.width,
		zIndex: 1250,
		transition: "0.25s width, 0.25s opacity",
		marginTop: theme.appBar.fullHeight,
		[theme.breakpoints.down('xs')]: {
			marginTop: 0,
			zIndex: 1350,
    },
	},
	drawerContent: {
		margin: theme.spacing(1),
	},
}));

export function CustomDrawer(props){
	const theme = useTheme();
	const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const classes = useStyles();

  const { userState } = React.useContext(UserContext);

	const isDrawerOpen = props.contentWidth !== 0;
	const sideBarItems = props.sideBarItems;

	useEffect(() => {
		props.onDrawerClose()
	},[userState])

	PageController.listen(() => {
		props.onDrawerClose()
	})

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