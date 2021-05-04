import React, { useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { PageController } from 'src/lib/page_controller';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const useStyles = makeStyles((theme) => ({
	sideBar: {
		overflow: "hidden",
    width:48,
    height: "100vh",
		display: "flex",
		flexDirection: "column",
	},
	sideBarContainer: {
		background: theme.drawer.default,
		zIndex: 1250,
		width: "auto",
		paddingTop: theme.appBar.fullHeight,
    position: "fixed",
		overflow: "hidden",
		[theme.breakpoints.down('xs')]: {
			paddingTop: 0,
			position: "initial",
    },
	},
	closeSideBarIcon: {
		marginTop: 4,
		width: "fit-content"
	}
}));

export function CustomSideBar(props){
	const theme = useTheme();
	const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const classes = useStyles();
	const sideBarItems = props.sideBarItems;
	const drawerState = props.isDrawerOpen ? "open" : "close"

	const unListen = PageController.listen(() => {
		props.onDrawerClose()
	})
	
  useEffect(_ => {
    return _ => unListen()
  }, [])

	const handleDrawerContent = (element, newDrawerState) => {
		const elementIdentifier = element.identifier;
		const elementWidth = element.width;
		
		const drawerAction = newDrawerState === "toggle" 
			? drawerState === "close" 
			: newDrawerState === "open"

		if(drawerAction)
			props.setDrawerContent({
				identifier: elementIdentifier,
				width: elementWidth,
			})
		else
			props.onDrawerClose()
	}

  return (
		<Grid
			container
			direction="row"
			className={classes.sideBarContainer}
		>
			<div className={classes.sideBar}>
				{
					mobileView &&
						<IconButton
							className={classes.closeSideBarIcon}
							onClick={props.onSidebarClose}
						>
							<CloseRoundedIcon/>
						</IconButton>
				}
				{sideBarItems.map((element, index) => {
					const isHidden = element.skipOnBigScreen || element.hideWhen
					if(isHidden)
						return;
					return (
						<element.item 
							key={index}
							setDrawerState={(newDrawerState) => handleDrawerContent(element, newDrawerState)}
							drawerState={drawerState}
						/>
					)
				}
				)}
			</div>
			{props.drawerContent}
		</Grid>

  )
}