import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import { CustomAvatar } from 'src/components/custom_avatar';

import { PageController } from 'src/lib/page_controller';

import { OrganizationListItem } from 'src/components/organization_list_item';
import { getBookmarkedOrganizations } from './lib/get_bookmarked_organizations';


const useStyles = makeStyles((theme) => ({
	sideBarList: {
		"& > *": {
			padding: 12,
		},
		"& *": {
			minWidth: "0"
		}
	},
	sideBarAvatar: {
		padding: 4,
		animation: `$fade 0.25s linear`,
	},
	"@keyframes fade": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  },
	organizationsList: props => ({
		padding: 0,
		margin: "8px 0px",
		background: theme.palette.background.backgroundTransparent,
		borderRadius: theme.drawer.width / 2,
		height: props.organizationsListHeight,
		transition: "0.25s height"
	}),
	createOrJoinButtonOrganizationListButton: {
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
		transition: "0.25s transform"
	}
}));

export function SideBarOrganizationList(props){
	const isDrawerOpen = props.isDrawerOpen;
	const [loading, setLoading] = React.useState(false)
  const [organizationsList, setOrganizationsList] = React.useState([])
  const [numberOfOrganizationsFinded, setNumberOfOrganizationsFinded] = React.useState(0)
  const [showOnlyBookmarked, setShowOnlyBookmarked] = React.useState(false)

	const extraIcons = 3;
	const maxOrganizationsNumber = 4;
	const organizationsNumber = 
		numberOfOrganizationsFinded > maxOrganizationsNumber ? 
		maxOrganizationsNumber : numberOfOrganizationsFinded

	const totaleIcons = organizationsNumber + extraIcons
	const iconHeight = 48;

	const organizationsListHeightOnDrawerOpen = iconHeight * extraIcons
	const organizationsListHeightOnDrawerClose = iconHeight * totaleIcons
	const organizationsListHeight = isDrawerOpen ? 
		organizationsListHeightOnDrawerOpen : organizationsListHeightOnDrawerClose

	const expandIconTopPositionOnDrawerOpen = iconHeight * (extraIcons - 1) 
	const expandIconTopPositionOnDrawerClose = iconHeight * (totaleIcons - 1)
	const expandIconTopPosition = isDrawerOpen ? 
		expandIconTopPositionOnDrawerOpen : expandIconTopPositionOnDrawerClose

  const classes = useStyles({organizationsListHeight, expandIconTopPosition});

	document.addEventListener('updateUserOrganizations', () => refreshOrganizationList())

  useEffect(() => {
    setLoading(true)
    setTimeout(() => refreshOrganizationList(), 150);
  }, [])

	useEffect(() => {
		handleBookmarEvent(showOnlyBookmarked)
	}, [showOnlyBookmarked])

	const handleBookmarEvent = (state) => {
		const showOnlyBookmarkedOrganizations = new CustomEvent('showOnlyBookmarkedOrganizations', {detail: state});
		document.dispatchEvent(showOnlyBookmarkedOrganizations)
	}

	const refreshOrganizationList = () => {
		getBookmarkedOrganizations({
			maxOrganizationsNumber: maxOrganizationsNumber
		})
		.then(data => {
			setOrganizationsList(data.values)
			setNumberOfOrganizationsFinded(data.total)
		})
		.finally(_ => setLoading(false))
	}



	const handleOpenDrawerWithBookmarked = () => {
		if(!isDrawerOpen){
			setShowOnlyBookmarked(true)
			props.toggleDrawer()
			return
		}

		setShowOnlyBookmarked(!showOnlyBookmarked)
	}

	const handleOpendDrawer = () => {
		setShowOnlyBookmarked(false)
		props.toggleDrawer()
	}

	const organizationAvatarList = 
		organizationsList.map(organization => 
			<OrganizationListItem 
				className={classes.sideBarAvatar} 
				key={organization.id}
				organizationId={organization.id}
			>
				<CustomAvatar
					propsLoading={loading}
					src={`organizations/${organization.id}/logo`}
					alt={organization.name}
				/>
			</OrganizationListItem>
		)

	const showOrganizationAvatarList = !isDrawerOpen &&	organizationAvatarList

	return (
		<List className={`${classes.sideBarList} ${classes.organizationsList}`}>
			<ListItem 
				button
				component="a"
				href="/organization"
				onClick={(event) => PageController.push('/organization', event)}	
				className={classes.createOrJoinButtonOrganizationListButton}
			>
				<ListItemIcon>
					<AddRoundedIcon/>
				</ListItemIcon>
			</ListItem>
			<ListItem 
				button
				component="a"
				onClick={handleOpenDrawerWithBookmarked}
			>
				<ListItemIcon>
					<BookmarksRoundedIcon color={isDrawerOpen && showOnlyBookmarked ? "secondary" : "inherit"}/>
				</ListItemIcon>
			</ListItem>
			{showOrganizationAvatarList}
			<ListItem 
				button 
				className={classes.expandOrganizationListButton}
				onClick={handleOpendDrawer}
			>
				<ListItemIcon className={`${classes.drawerHandlerIcon} ${isDrawerOpen ? classes.rotateIcon : ""}`}>
					<NavigateNextRoundedIcon/>
				</ListItemIcon>
			</ListItem>
		</List>
	)
}