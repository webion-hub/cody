import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { Admin } from 'src/lib/server_calls/admin';
import { getDeletedIcon } from 'src/pages/admin_pages/lib/get_deleted_icon';
import { getEmailValidIcon } from 'src/pages/admin_pages/lib/get_email_valid_icon';
import { AdminUserMenu } from './admin_user_menu';

export default function UsersList(props){
	const associateUsers = (settings) => {
		const list = settings.list;
		const index = settings.index;
		const data = settings.data;
		const id = data.id;

		const menu = 
			<AdminUserMenu
				data={data} 
			/>

		const birthDate = new Date(data.detail.birthDate)
		const registrationDate = new Date(data.detail.registrationDate)
		list.push({
			menu: menu,
			id: index,
			Id: id,
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