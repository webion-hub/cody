import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'src/components/user_controller_context/user_controller_context';

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
		transition: "0.25s width, 0.25s opacity",
	},
	drawerContent: {
		margin: theme.spacing(1),
	},
}));

export function CustomSideBar(props){
  const classes = useStyles();
	const sideBarItems = props.sideBarItems;
  const { userState } = React.useContext(UserContext);
	const [drawerContent, setDrawerContent] = React.useState({
		identifier: "",
		width: 0,
	})

	useEffect(() => {
		setDrawerContent({
			identifier: "",
			width: 0,
		})
	},[userState])

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
			{props.children}
    </>
  )
}