import React from 'react';
import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { Admin } from 'src/lib/admin';

export function UsersList(props){
	const associateUsers = (settings) => {
		const list = settings.list;
		const data = settings.data;
		const index = settings.index;
		
		const birthDate = new Date(data.detail.birthDate)
		list.push({
			id: index,
			Id: data.id,
			username: data.username,
			email: data.email,
			name: data.detail.name,
			surname: data.detail.surname,
			birthDate: birthDate.toLocaleDateString(),
			schoolId: data.school? data.school.id : "",
		})
	}

	const usersColumns = [
		{	selector: 'Id', name: 'ID', sortable: true },
		{	selector: 'username', name: 'Username', sortable: true },
		{	selector: 'email', name: 'Email', sortable: true },
		{ selector: 'name', name: 'Nome', sortable: true },
		{ selector: 'surname', name: 'Cognome', sortable: true },
		{ selector: 'birthDate', name: 'Data di nascita', sortable: true },
		{ selector: 'schoolId', name: 'Id Scuola', sortable: true },
	]

	return (
		<DataTableBase
			getData={Admin.getUsers}
			associateData={associateUsers}
			columns={usersColumns}
			title="Users"
			maxPageElements={props.maxPageElements}
		/>
	);
}