import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BrightnessMediumRoundedIcon from '@material-ui/icons/BrightnessMediumRounded';

import { ThemeContextConsumer } from 'src/components/theme_context'

const useStyles = makeStyles((theme) => ({
	sideBarList: {
		"& > *": {
			padding: 12,
		},
		"& *": {
			minWidth: "0"
		},
        position: "fixed",
        bottom: 0
	}
}));

export function SideBarThemeIcon(){
  const classes = useStyles();

	return (
		<List className={classes.sideBarList}>
            <ThemeContextConsumer>
                {({theme, toggleTheme}) => (
                    <ListItem 
                        button
                        component="a"
                        onClick={toggleTheme}
                    >
                        <ListItemIcon>
                            <BrightnessMediumRoundedIcon/>
                        </ListItemIcon>
                    </ListItem>
                )}
            </ThemeContextConsumer>
		</List>
	)
}