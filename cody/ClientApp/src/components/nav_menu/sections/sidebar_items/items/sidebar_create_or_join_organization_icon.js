import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { PageController } from 'src/lib/page_controller';
import AddRoundedIcon from '@material-ui/icons/AddRounded';


const useStyles = makeStyles((theme) => ({
	sideBarList: {
		"& > *": {
			padding: 12,
		},
		"& *": {
			minWidth: "0"
		}
	}
}));

export function SideBarCreateOrJoinOrganizationIcon(){
  const classes = useStyles();

	return (
		<List className={classes.sideBarList}>
			<ListItem 
				button
				component="a"
				href="/organization"
				onClick={(event) => PageController.push('/organization', event)}	
			>
				<ListItemIcon>
					<AddRoundedIcon/>
				</ListItemIcon>
			</ListItem>
		</List>
	)
}
