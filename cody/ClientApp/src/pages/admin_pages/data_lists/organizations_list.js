import React from 'react';
import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { RowMenu } from 'src/pages/admin_pages/components/row_menu';
import { Organizations } from 'src/lib/organizations';
import { getDeletedIcon } from 'src/pages/admin_pages/lib/get_deleted_icon';
import { getVerificationIcon } from 'src/pages/admin_pages/lib/get_verification_icon';
import { getKindIcon } from 'src/pages/admin_pages/lib/get_kind_icon';

export function OrganizationsList(props){

	const associateOrganizations = (settings) => {
		const list = settings.list;
		/**@type {import('src/lib/organizations').Organization} */
		const data = settings.data;
		const index = settings.index;

		const menu = 
			<RowMenu 
				data={data} 
				onVerify={Organizations.verify} 
				onDelete={Organizations.delete} 
				onRestore={Organizations.restore}
			/>

		list.push({
			menu: menu,
			id: index,
			Id: data.id,
			kind: getKindIcon(data.kind),
			name: data.name,
			location: data.detail.location,
			verified: getVerificationIcon(data.state.hasBeenVerified),
			deleted: getDeletedIcon(data.state.hasBeenDeleted),
		})
	}

	const usersColumns = [
		{ selector: 'menu', name: '', sortable: true, width: "48px", compact: true },
		{	selector: 'Id', name: 'ID', sortable: true },
		{	selector: 'kind', name: 'Kind' },
		{	selector: 'name', name: 'Nome', sortable: true },
		{	selector: 'location', name: 'Luogo', sortable: true },
		{ selector: 'verified', name: 'Verificato' },
		{ selector: 'deleted', name: 'Stato' },
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

