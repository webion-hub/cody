import React from 'react';
import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { RowMenu } from 'src/pages/admin_pages/components/row_menu';
import { Admin } from 'src/lib/server_calls/admin';
import { getDeletedIcon } from 'src/pages/admin_pages/lib/get_deleted_icon';
import { getEmailValidIcon } from 'src/pages/admin_pages/lib/get_email_valid_icon';

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
		const registrationDate = new Date(data.detail.registrationDate)
		list.push({
			menu: menu,
			id: index,
			Id: data.id,
			username: data.username,
			email: data.email,
			name: data.detail.name,
			surname: data.detail.surname,
			birthDate: birthDate.toLocaleDateString(),
			registrationDate: registrationDate.toLocaleDateString(),
			deleted: getDeletedIcon(data.state.hasBeenDeleted),
			emailValid: getEmailValidIcon(data.state.isEmailVerified),
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
		{ selector: 'registrationDate', name: 'Data di registrazione', sortable: true },
		{ selector: 'deleted', name: 'Stato' },
		{ selector: 'emailValid', name: 'Email verificata' },
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