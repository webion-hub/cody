import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	sideBar: {
		background: theme.drawer.default,
    width: 48,
    position: "fixed",
    height: "100vh",
		marginTop: theme.appBar.fullHeight,
		zIndex: 1250
	},
	sideBarDrawer: {
		background: theme.drawer.default,
    position: "fixed",
    height: "100vh",
		marginTop: theme.appBar.fullHeight,
		marginLeft: theme.drawer.width,
		zIndex: 1250,
		transition: "0.25s width, 0.25s opacity"
	},
	drawerContent: {
		margin: theme.spacing(1),
		background: theme.palette.background.backgroundTransparent
	},
}));

export function CustomSideBar(props){
  const classes = useStyles();
	const sideBarItems = props.sideBarItems;
	const [drawerContent, setDrawerContent] = React.useState({
		identifier: "",
		width: 0,
	})

	const getDrawerContent = () => {
		const findedElement = sideBarItems.find(element => {
			const drawerContentIdentifier = drawerContent.identifier;
			return element.identifier === drawerContentIdentifier
		});

		if(findedElement === undefined)
			return null;
		
		return findedElement.drawerContent;
	}

	const handleDrawerContent = (element) => {
		const elementIdentifier = element.identifier;
		const elementWidth = element.width;

		const actualDrawerIdentifier = drawerContent.identifier
		const isDrawerContentOpen = actualDrawerIdentifier !== "";
		if(isDrawerContentOpen){
			setDrawerContent({
				identifier: actualDrawerIdentifier,
				width: 0,
			})

			setTimeout(() => 
				setDrawerContent({
					identifier: "",
					width: 0,
				}), 250
			)
		}

		else
			setDrawerContent({
				identifier: elementIdentifier,
				width: elementWidth,
			})
	}

  return (
    <>
			<div
				className={classes.sideBarDrawer}
				style={{
					width: drawerContent.width,
					opacity: drawerContent.width !== 0 ? 1 : 0,
				}}
			>
				<div className={classes.drawerContent}>
					{getDrawerContent()}
				</div>
			</div>
			<div className={classes.sideBar}>
				{sideBarItems.map((element, index) => {
					if(element.skipOnBigScreen)
						return;
					return (
						<element.item 
							key={index}
							setOpenDrawer={() => handleDrawerContent(element)}
							isDrawerOpen={drawerContent.width !== 0}
						/>
					)
				}
				)}
			</div>
			{props.children}
    </>
  )
}