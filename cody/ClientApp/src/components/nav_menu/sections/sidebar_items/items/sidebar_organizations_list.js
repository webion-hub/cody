import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import { CustomAvatar } from 'src/components/custom_avatar';

import { PageController } from 'src/lib/page_controller';

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
		height: props.isDrawerOpen ? 96 : 240,
		transition: "0.25s height"
	}),
	topOrganizationListButton: {
		borderRadius: `${theme.drawer.width / 2}px ${theme.drawer.width / 2}px 0 0`
	},
	bottomOrganizationListButton: props => ({
		borderRadius: `0 0 ${theme.drawer.width / 2}px ${theme.drawer.width / 2}px`,
		position: "absolute",
		top: props.isDrawerOpen ? 48 : 192,
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
  const classes = useStyles({isDrawerOpen});

	return (
		<List className={`${classes.sideBarList} ${classes.organizationsList}`}>
			<ListItem 
				button
				component="a"
				href="/organization"
				onClick={(event) => PageController.push('/organization', event)}	
				className={classes.topOrganizationListButton}
			>
				<ListItemIcon>
					<AddRoundedIcon/>
				</ListItemIcon>
			</ListItem>
			{
				!isDrawerOpen &&
					<>
						<ListItem button className={classes.sideBarAvatar}>
							<CustomAvatar/>
						</ListItem>
						<ListItem button className={classes.sideBarAvatar}>
							<CustomAvatar/>
						</ListItem>
						<ListItem button className={classes.sideBarAvatar}>
							<CustomAvatar/>
						</ListItem>
					</>
			}
			<ListItem 
				button 
				className={classes.bottomOrganizationListButton}
				onClick={props.setOpenDrawer}
			>
				<ListItemIcon className={`${classes.drawerHandlerIcon} ${isDrawerOpen ? classes.rotateIcon : ""}`}>
					<NavigateNextRoundedIcon/>
				</ListItemIcon>
			</ListItem>
		</List>
	)
}