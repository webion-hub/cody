import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PageController } from 'src/lib/page_controller';

const useStyles = makeStyles((theme) => ({
	sideBar: {
		background: theme.drawer.default,
		overflow: "hidden",
    width:48,
    position: "fixed",
    height: "100vh",
		display: "flex",
		flexDirection: "column",
		zIndex: 1250,
		marginTop: theme.appBar.fullHeight,
		[theme.breakpoints.down('xs')]: {
			marginTop: 0,
			position: "initial",
    },
	}
}));

export function CustomSideBar(props){
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
		<div className={classes.sideBar}>
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
  )
}