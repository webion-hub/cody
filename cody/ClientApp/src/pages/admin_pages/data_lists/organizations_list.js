import React from 'react';
import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { Organizations } from 'src/lib/organizations';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  noVerified: {
    color: "red",
  },
	verified: {
    color: "green",
  },
}));

export function OrganizationsList(props){
  const classes = useStyles();

	const getKindIcon = (kind) => {
		switch(kind){
			case "Team":
				return <GroupRoundedIcon fontSize="small"/>
			case "School":
				return <SchoolRoundedIcon fontSize="small"/>
			case "Company":
				return <BusinessCenterRoundedIcon fontSize="small"/>
		}
	}

	const associateOrganizations = (settings) => {
		const list = settings.list;
		/**@type {import('src/lib/organizations').Organization} */
		const data = settings.data;
		const index = settings.index;

		list.push({
			id: index,
			Id: data.id,
			kind: getKindIcon(data.kind),
			name: data.name,
			location: data.detail.location,
			verified: data.state.hasBeenVerified ? 
				<BeenhereRoundedIcon fontSize="small" className={classes.verified}/> 
				: 
				<TimerRoundedIcon fontSize="small" className={classes.noVerified}/>,
		})
	}

	const usersColumns = [
		{	selector: 'Id', name: 'ID', sortable: true },
		{	selector: 'kind', name: 'Kind', sortable: true },
		{	selector: 'name', name: 'Nome', sortable: true },
		{	selector: 'location', name: 'Luogo', sortable: true },
		{ selector: 'verified', name: 'Verificato', sortable: true },
	]

	return (
		<DataTableBase
			getData={Organizations.listAll}
			associateData={associateOrganizations}
			columns={usersColumns}
			title="Organizzazioni"
			maxPageElements={props.maxPageElements}
		/>
	);
}