import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';

import { UsersList } from 'src/pages/admin_pages/data_lists/users_list';
import { OrganizationsList } from 'src/pages/admin_pages/data_lists/organizations_list';
import { UserContext } from "src/components/user_controller_context";
import { UnauthorizedPage } from "src/pages/unauthorized_page";


export const useStyles = makeStyles((theme) => ({
	dataGrid: {
		position: "relative",
		maxWidth: `calc(100vw - ${theme.drawer.width}px)`,
		marginTop: theme.appBar.fullHeight,
		minHeight: `calc(100vh - ${theme.appBar.fullHeight}px)`,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
			maxWidth: '100vw',
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
							<Tab label="Organizations"/>
						</Tabs>
						<DataTab tabValue={value} index={0}>
							<UsersList maxPageElements={maxPageElements}/>
						</DataTab>
						<DataTab tabValue={value} index={1}>
							<OrganizationsList maxPageElements={maxPageElements}/>
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