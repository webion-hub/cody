import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, SwipeableDrawer } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const useStyles = makeStyles((theme) => ({
	closeSideBarIcon: {
		marginTop: 4
	}
}));

export function CustomSideBarMobile(props){
	const theme = useTheme();
  const classes = useStyles();

  return (
		<SwipeableDrawer
			variant="temporary"
			anchor={theme.direction === 'rtl' ? 'right' : 'left'}
			open={props.openSidebar}
			onOpen={props.onSidebarOpen}
			onClose={props.onSidebarClose}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
		>
			<IconButton
				className={classes.closeSideBarIcon}
				onClick={props.onSidebarClose}
			>
				<CloseRoundedIcon/>
			</IconButton>
			{props.children}
		</SwipeableDrawer>
  )
}