import makeStyles from '@material-ui/core/styles/makeStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useTheme from '@material-ui/styles/useTheme';

const useStyles = makeStyles(() => ({
	closeSideBarIcon: {
		marginTop: 4,
		width: "fit-content"
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
			{props.children}
		</SwipeableDrawer>
  )
}