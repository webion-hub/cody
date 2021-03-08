import React from 'react';
import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { Organizations } from 'src/lib/organizations';

export function OrganizationsList(props){
	const associateOrganizations = (settings) => {
		const list = settings.list;
		const data = settings.data;
		const index = settings.index;

		list.push({
			id: index,
			Id: data.id,
			kind: data.kind,
			name: data.name,
			city: data.detail.city,
			country: data.detail.country,
		})
	}

	const usersColumns = [
		{	selector: 'Id', name: 'ID', sortable: true },
		{	selector: 'kind', name: 'Kind', sortable: true },
		{	selector: 'name', name: 'Nome', sortable: true },
		{	selector: 'city', name: 'Città', sortable: true },
		{ selector: 'country', name: 'Paese', sortable: true },
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