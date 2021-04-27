import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';

import { PageController } from 'src/lib/page_controller';

import { getBookmarkedOrganizations } from './lib/get_bookmarked_organizations';
import { SidebarBookmarkedOrganizationList } from './components/sidebar_bookmarked_organization_list';
import { EventsDispatcher } from 'src/lib/events_dispatcher';
import { useListener } from 'src/lib/hooks/use_listener';

const useStyles = makeStyles((theme) => ({
	organizationsList: props => ({
		padding: 0,
		margin: "8px 0px",
		background: theme.palette.background.backgroundTransparent,
		borderRadius: theme.drawer.width / 2,
		height: props.organizationsListHeight,
		transition: "0.25s height",
	}),
	listItemWithIcon: {
		padding: 12,
	},
	createOrJoinButton: {
		borderRadius: `${theme.drawer.width / 2}px ${theme.drawer.width / 2}px 0 0`
	},
	expandOrganizationListButton: props => ({
		borderRadius: `0 0 ${theme.drawer.width / 2}px ${theme.drawer.width / 2}px`,
		position: "absolute",
		top: props.expandIconTopPosition,
		transition: "0.25s top"
	}),
	rotateIcon: {
		transform: "rotate(180deg)",
	},
	drawerHandlerIcon: {
		transition: "0.25s transform",
		minWidth: "0",
	}
}));

export function SideBarOrganizationList(props){
	const drawerState = props.drawerState;
	const isDrawerOpen = drawerState === "open";

	const [loading, setLoading] = React.useState(false)
  const [organizationsList, setOrganizationsList] = React.useState([])
  const [numberOfOrganizationsFinded, setNumberOfOrganizationsFinded] = React.useState(0)
  const [drawerFilterState, setDrawerFilterState] = React.useState("showAll")
	//Settings
	const extraIcons = 3;
	const maxOrganizationsNumber = 4;
	const iconHeight = 48;

	const organizationsNumber = 
		numberOfOrganizationsFinded > maxOrganizationsNumber ? 
		maxOrganizationsNumber : numberOfOrganizationsFinded

	const totaleIcons = organizationsNumber + extraIcons

	//Organization List final height
	const organizationsListHeightOnDrawerOpen = iconHeight * extraIcons
	const organizationsListHeightOnDrawerClose = iconHeight * totaleIcons
	const organizationsListHeight = isDrawerOpen ? 
		organizationsListHeightOnDrawerOpen : organizationsListHeightOnDrawerClose

	//Expand Icon top position
	const expandIconTopPositionOnDrawerOpen = iconHeight * (extraIcons - 1) 
	const expandIconTopPositionOnDrawerClose = iconHeight * (totaleIcons - 1)
	const expandIconTopPosition = isDrawerOpen ? 
		expandIconTopPositionOnDrawerOpen : expandIconTopPositionOnDrawerClose

  const classes = useStyles({organizationsListHeight, expandIconTopPosition});

	const refreshOrganizationList = () => {
    setLoading(true)
		getBookmarkedOrganizations({
			maxOrganizationsNumber: maxOrganizationsNumber
		})
		.then(data => {
			setOrganizationsList(data.values)
			setNumberOfOrganizationsFinded(data.total)
		})
		.finally(_ => setLoading(false))
	}

	const handleOpenDrawerShowOnlyBookmarked = () => {
		props.setDrawerState("open")
		if(drawerFilterState === "onlyBookmarked")
			setDrawerFilterState("showAll")
		else
			setDrawerFilterState("onlyBookmarked")
	}

	const handleOpenDrawer = () => {
		setDrawerFilterState("showAll")
		props.setDrawerState("toggle")
	}

	useListener({
		eventFunction: refreshOrganizationList,
		controller: EventsDispatcher.setEvent('updateBookmarkedOrganizations'),
		firstExecutionDelay: 150,
  }, [])

	useEffect(() => {
		const drawerFilterStateEvent = new CustomEvent('drawerFilterState', {detail: drawerFilterState});
		document.dispatchEvent(drawerFilterStateEvent)

		if(drawerState === "close"){
			setDrawerFilterState("showAll")
			refreshOrganizationList()
		}

  }, [drawerState, drawerFilterState])

	const avatarList = drawerState === "close" &&
	<SidebarBookmarkedOrganizationList
		organizationsList={organizationsList}
		loading={loading}
	/>
	
	return (
		<List className={classes.organizationsList}>
			<ListItem 
				button
				component="a"
				href="/organization"
				onClick={(event) => PageController.push('/organization', event)}	
				className={`${classes.createOrJoinButton} ${classes.listItemWithIcon}`}
				disabled={loading}
			>
				<ListItemIcon>
					<AddRoundedIcon/>
				</ListItemIcon>
			</ListItem>
			<ListItem 
				button
				component="a"
				className={classes.listItemWithIcon}
				onClick={handleOpenDrawerShowOnlyBookmarked}
				disabled={loading}
			>
				<ListItemIcon>
					<BookmarksRoundedIcon 
						color={
							drawerFilterState === "onlyBookmarked" ?
								"secondary" :	"inherit"
						}
					/>
				</ListItemIcon>
			</ListItem>
			{avatarList}
			<ListItem 
				button 
				className={`${classes.expandOrganizationListButton} ${classes.listItemWithIcon}`}
				onClick={handleOpenDrawer}
				disabled={loading}
			>
				<ListItemIcon 
					className={`${classes.drawerHandlerIcon} ${isDrawerOpen ? classes.rotateIcon : ""}`}
				>
					<NavigateNextRoundedIcon/>
				</ListItemIcon>
			</ListItem>
		</List>
	)
}