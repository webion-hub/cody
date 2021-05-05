import { lazyLoader } from 'src/components/lazy_loader';

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';

import { UserContext } from "src/components/user_controller_context/user_controller_context";
import { DataTab } from "./components/data_tab";

import { PageController } from 'src/lib/page_controller';

const UsersList = lazyLoader(() => import('src/pages/admin_pages/components/data_lists/users_list/users_list'))
const OrganizationsList = lazyLoader(() => import('src/pages/admin_pages/components/data_lists/organizations_list/organizations_list'))

const useStyles = makeStyles((theme) => ({
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

export default function AdminPage(){
	const classes = useStyles();
  const [value, setValue] = React.useState(0);
	const { userState, role } = React.useContext(UserContext);

	useEffect(() => {
		if(userState === "loading")
			return;

		if(role !== "Admin")
			PageController.push('/access-denied')
	},[userState])

	const handleChangeTab = (event, newValue) => {
		setValue(newValue)
	}

	const maxPageElements = 20

	return (
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
	);
}