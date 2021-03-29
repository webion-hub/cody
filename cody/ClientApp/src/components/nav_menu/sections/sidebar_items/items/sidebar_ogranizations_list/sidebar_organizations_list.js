import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import { CustomAvatar } from 'src/components/custom_avatar';

import { PageController } from 'src/lib/page_controller';

import { User } from 'src/lib/user';


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
		background: theme.palette.background.paperSecondary,
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

	const maxOrganizationsNumber = 4;
	const organizationsNumber = 
		numberOfOrganizationsFinded > maxOrganizationsNumber ? 
		maxOrganizationsNumber : numberOfOrganizationsFinded
	const iconHeight = 48;

	const organizationsListHeightOnDrawerOpen = iconHeight * 2
	const organizationsListHeightOnDrawerClose = iconHeight * (organizationsNumber + 2)
	const organizationsListHeight = isDrawerOpen ? 
		organizationsListHeightOnDrawerOpen : organizationsListHeightOnDrawerClose

	const expandIconTopPositionOnDrawerOpen = iconHeight
	const expandIconTopPositionOnDrawerClose = iconHeight * (organizationsNumber + 1)
	const expandIconTopPosition = isDrawerOpen ? 
		expandIconTopPositionOnDrawerOpen : expandIconTopPositionOnDrawerClose

  const classes = useStyles({organizationsListHeight, expandIconTopPosition});

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      User
       .getJoinedOrganizations({
         filter: "+logo",
				 limit: maxOrganizationsNumber
       })
        .then(data => {
					setNumberOfOrganizationsFinded(data.total)
					setOrganizationsList(data.values)
				})
        .finally(() => setLoading(false))
    }, 150);
  }, [])

	const organizationAvatarList = 
		organizationsList.map((organization) => 
			<ListItem button className={classes.sideBarAvatar} key={organization.id}>
				<CustomAvatar
					propsLoading={loading}
					src={`organizations/${organization.id}/logo`}
					alt={organization.name}
				/>
			</ListItem>
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
			{showOrganizationAvatarList}
			<ListItem 
				button 
				className={classes.expandOrganizationListButton}
				onClick={props.setOpenDrawer}
			>
				<ListItemIcon className={`${classes.drawerHandlerIcon} ${isDrawerOpen ? classes.rotateIcon : ""}`}>
					<NavigateNextRoundedIcon/>
				</ListItemIcon>
			</ListItem>
		</List>
	)
}