import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'src/components/user_controller_context/user_controller_context';
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
	const isDrawerOpen = props.isDrawerOpen

  const { userState } = React.useContext(UserContext);

	useEffect(() => {
		props.onDrawerClose()
	},[userState])

	PageController.listen(() => {
		props.onDrawerClose()
	})

	const handleDrawerContent = (element) => {
		const elementIdentifier = element.identifier;
		const elementWidth = element.width;

		if(isDrawerOpen)
			props.onDrawerClose()
		else
			props.setDrawerContent({
				identifier: elementIdentifier,
				width: elementWidth,
			})
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
						setOpenDrawer={() => handleDrawerContent(element)}
						isDrawerOpen={isDrawerOpen}
					/>
				)
			}
			)}
		</div>
  )
}