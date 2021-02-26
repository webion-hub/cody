import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';

import { UsersList } from 'src/pages/admin_pages/data_lists/users_list';
import { SchoolsList } from 'src/pages/admin_pages/data_lists/schools_list';
import { UserContext } from "src/components/user_controller_context";
import { UnauthorizedPage } from "src/pages/unauthorized_page";


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
  const [isAdmin, setIsAdmin] = React.useState(false);
	const { role } = React.useContext(UserContext);

	useEffect(() => {
		setIsAdmin(role === "Admin") 
	},[role])

	const handleChangeTab = (event, newValue) => {
		setValue(newValue)
	}

	const maxPageElements = 20

	return (
		<>
			{
				isAdmin ? 
					<div className={classes.dataGrid}>
						<Tabs value={value} onChange={handleChangeTab}>
							<Tab label="Users"/>
							<Tab label="Schools"/>
						</Tabs>
						<DataTab tabValue={value} index={0}>
							<UsersList maxPageElements={maxPageElements}/>
						</DataTab>
						<DataTab tabValue={value} index={1}>
							<SchoolsList maxPageElements={maxPageElements}/>
						</DataTab>
					</div>
					:
					<UnauthorizedPage/>				
			}
		</>

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