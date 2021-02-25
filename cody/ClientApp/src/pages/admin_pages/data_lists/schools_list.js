import React from 'react';
import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { School } from 'src/lib/school';

export function SchoolsList(props){
	const associateUsers = (list, data, index) => {
		list.push({
			id: index,
			Id: data.id,
			name: data.name,
			city: data.city,
			country: data.country,
		})
	}

	const usersColumns = [
		{	selector: 'Id', name: 'ID', sortable: true },
		{	selector: 'name', name: 'Nome', sortable: true },
		{	selector: 'city', name: 'Città', sortable: true },
		{ selector: 'country', name: 'Paese', sortable: true },
	]

	return (
		<DataTableBase
			getData={School.getAll}
			associateData={associateUsers}
			columns={usersColumns}
			title="Scuole"
			pageElements={props.pageElements}
		/>
	);
}