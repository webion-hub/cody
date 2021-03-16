import React from 'react';
import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { RowMenu } from 'src/pages/admin_pages/components/row_menu';
import { Admin } from 'src/lib/admin';
import { getDeletedIcon } from 'src/pages/admin_pages/lib/get_deleted_icon';

export function UsersList(props){
	const associateUsers = (settings) => {
		const list = settings.list;
		const data = settings.data;
		const index = settings.index;
		
		const menu = 
			<RowMenu 
				data={data} 
				onDelete={Admin.deleteUser} 
				onRestore={Admin.restoreUser}
			/>

		const birthDate = new Date(data.detail.birthDate)
		list.push({
			menu: menu,
			id: index,
			Id: data.id,
			username: data.username,
			email: data.email,
			name: data.detail.name,
			surname: data.detail.surname,
			birthDate: birthDate.toLocaleDateString(),
			deleted: getDeletedIcon(data.state.hasBeenDeleted),
		})
	}

	const usersColumns = [
		{ selector: 'menu', name: '', sortable: true, width: "48px", compact: true },
		{	selector: 'Id', name: 'ID', sortable: true },
		{	selector: 'username', name: 'Username', sortable: true },
		{	selector: 'email', name: 'Email', sortable: true },
		{ selector: 'name', name: 'Nome', sortable: true },
		{ selector: 'surname', name: 'Cognome', sortable: true },
		{ selector: 'birthDate', name: 'Data di nascita', sortable: true },
		{ selector: 'deleted', name: 'Stato' },
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