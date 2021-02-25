import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { UsersList } from 'src/pages/admin_pages/data_lists/users_list';
import { SchoolsList } from 'src/pages/admin_pages/data_lists/schools_list';

export const useStyles = makeStyles((theme) => ({
	dataGrid: {
		position: "relative",
		maxWidth: "100vw",
		marginTop: theme.appBar.fullHeight,
		minHeight: `calc(100vh - ${theme.appBar.fullHeight}px)`,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
			minHeight: `calc(100vh - ${theme.appBar.mobileHeight}px)`,
    },
	}
}));

export function AdminPage(){
	const classes = useStyles();
  const [value, setValue] = React.useState(0);

	const handleChangeTab = (event, newValue) => {
		setValue(newValue)
	}

	const pageElements = 20

	return (
		<div className={classes.dataGrid}>
			<Tabs value={value} onChange={handleChangeTab}>
				<Tab label="Users"/>
        <Tab label="Schools"/>
			</Tabs>
			<DataTab tabValue={value} index={0}>
				<UsersList pageElements={pageElements}/>
			</DataTab>
			<DataTab tabValue={value} index={1}>
				<SchoolsList pageElements={pageElements}/>
			</DataTab>
		</div>
	);
}

function DataTab(props){
	return (
		<div
			hidden={props.index != props.tabValue}
		>
			{props.children}
		</div>
	);
}