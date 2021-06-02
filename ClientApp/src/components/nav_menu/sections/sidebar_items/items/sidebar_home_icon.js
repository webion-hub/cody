import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

import { PageController } from 'src/lib/page_controller';

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

export function SideBarHomeIcon(){
  const classes = useStyles();

	return (
		<List className={classes.sideBarList}>
			<ListItem 
				button
				component="a"
				href="/"
				onClick={(event) => PageController.push('/', event)}	
			>
				<ListItemIcon>
					<HomeRoundedIcon/>
				</ListItemIcon>
			</ListItem>
		</List>
	)
}