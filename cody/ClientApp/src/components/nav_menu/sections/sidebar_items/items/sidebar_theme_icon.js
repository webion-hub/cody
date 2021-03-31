import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';

import { ThemeContext } from 'src/components/theme_context'

const useStyles = makeStyles((theme) => ({
	sideBarList: {
		"& > *": {
			padding: 12,
		},
		"& *": {
			minWidth: "0"
		},
        position: "inherit",
        bottom: 0
	}
}));

export function SideBarThemeIcon(){
  const classes = useStyles();

	return (
		<List className={classes.sideBarList}>
            <ThemeContext.Consumer>
                {({theme, toggleTheme}) => (
                    <ListItem 
                        button
                        component="a"
                        onClick={toggleTheme}	
                    >
                        <ListItemIcon>
                            <BrightnessMediumIcon/>
                        </ListItemIcon>
                    </ListItem>
                )}
            </ThemeContext.Consumer>
		</List>
	)
}