import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { PageController } from 'src/lib/page_controller';
import { getDrawerContent } from '../lib/get_drawer_content';
import { Backdrop, ClickAwayListener } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	sideBar: {
		background: theme.drawer.default,
    width: 48,
    position: "fixed",
    height: "100vh",
		marginTop: theme.appBar.fullHeight,
		display: "flex",
		flexDirection: "column",
		zIndex: 1250,
	},
	sideBarDrawer: {
		background: theme.drawer.default,
    position: "fixed",
    height: "100vh",
		marginTop: theme.appBar.fullHeight,
		marginLeft: theme.drawer.width,
		zIndex: 1250,
		transition: "0.25s width, 0.25s opacity",
	},
	drawerContent: {
		margin: theme.spacing(1),
	},
	backdrop: {
		zIndex: 1
	}
}));

export function CustomSideBar(props){
  const classes = useStyles();
	const sideBarItems = props.sideBarItems;
  const { userState } = React.useContext(UserContext);
	const [drawerContent, setDrawerContent] = React.useState({
		identifier: "",
		width: 0,
	})

	const handleCloseDrawer = () => {
		setDrawerContent({
			identifier: drawerContent.identifier,
			width: 0,
		})

		setTimeout(() => 
			setDrawerContent({
				identifier: "",
				width: 0,
			}), 250
		)
	}

	useEffect(() => {
		handleCloseDrawer()
	},[userState])

	PageController.listen(() => {
		handleCloseDrawer()
	})

	const handleDrawerContent = (element) => {
		const elementIdentifier = element.identifier;
		const elementWidth = element.width;

		const actualDrawerIdentifier = drawerContent.identifier
		const isDrawerContentOpen = actualDrawerIdentifier !== "";
		if(isDrawerContentOpen)
			handleCloseDrawer()
		else
			setDrawerContent({
				identifier: elementIdentifier,
				width: elementWidth,
			})
	}

  return (
    <>
			<ClickAwayListener onClickAway={() => handleCloseDrawer()}>
					<div>
						<div
							className={classes.sideBarDrawer}
							style={{
								width: drawerContent.width,
								opacity: drawerContent.width !== 0 ? 1 : 0,
							}}
						>
							<div className={classes.drawerContent}>
								{getDrawerContent(sideBarItems,	drawerContent.identifier)}
							</div>
						</div>
						<div className={classes.sideBar}>
							{sideBarItems.map((element, index) => {
								const isHidden = element.skipOnBigScreen || element.hideWhen
								if(isHidden)
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
					</div>
			</ClickAwayListener>
			{props.children}
			<Backdrop open={drawerContent.width !== 0} className={classes.backdrop}/>
    </>
  )
}