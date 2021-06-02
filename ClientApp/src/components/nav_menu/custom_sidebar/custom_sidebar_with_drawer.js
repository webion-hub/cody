import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, ClickAwayListener } from '@material-ui/core';

import { CustomDrawer } from './components/custom_drawer';
import { CustomSideBarMobile } from './components/custom_sidebar_on_mobile';
import { CustomSideBar } from './components/custom_sidebar';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: 1220
	},
	closeSideBarIcon: {
		marginTop: 4
	},
}));

export function CustomSideBarWithDrawer(props){
	const mobileView = useMobileView()
	const sideBarItems = props.sideBarItems;
	const [drawerContent, setDrawerContent] = React.useState({
		identifier: "",
		width: 0,
	})
	const isDrawerOpen = drawerContent.width !== 0;
  const classes = useStyles({isDrawerOpen});

	useEffect(() => {
		if(isDrawerOpen)
			document.body.style.overflowY = 'hidden';
		else
			document.body.style.overflowY = 'overlay';
	}, [isDrawerOpen])

	const handleCloseSidebar = () => {
		handleCloseDrawer()
		props.onSidebarClose?.()
	}

	const handleCloseDrawer = () => {
		if(!isDrawerOpen)
			return;

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

	const sideBar = 
		<CustomSideBar
			sideBarItems={sideBarItems}
			isDrawerOpen={isDrawerOpen}
			onDrawerClose={handleCloseDrawer}
			setDrawerContent={setDrawerContent}
			onSidebarClose={handleCloseSidebar}
			drawerContent={
				<CustomDrawer
					sideBarItems={sideBarItems}
					contentWidth={drawerContent.width}
					contentId={drawerContent.identifier}
					onDrawerClose={handleCloseDrawer}
				/>	
			}
		/>

	const mobileSideBar =
		<CustomSideBarMobile
			openSidebar={props.openSidebar}
			onSidebarOpen={props.onSidebarOpen}
			onSidebarClose={handleCloseSidebar}
		>
			{sideBar}
		</CustomSideBarMobile>

  return (
    <>
			<ClickAwayListener onClickAway={() => handleCloseDrawer()}>
				<div>
					{
						mobileView ? 
							mobileSideBar : sideBar
					}
				</div>
			</ClickAwayListener>
			{props.children}
			<Backdrop open={isDrawerOpen} className={classes.backdrop}/>
    </>
  )
}