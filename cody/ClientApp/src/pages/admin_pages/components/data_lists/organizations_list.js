import React from 'react';
import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { RowMenu } from 'src/pages/admin_pages/components/row_menu';
import { Organizations } from 'src/lib/organizations';
import { getDeletedIcon } from 'src/pages/admin_pages/lib/get_deleted_icon';
import { getVerificationIcon } from 'src/pages/admin_pages/lib/get_verification_icon';
import { OrganizationKindIcon } from 'src/components/organization_kind_icon';
import { CustomAvatar } from 'src/components/custom_avatar';

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
			logo: data.hasLogo ? <CustomAvatar src={`organizations/${data.id}/logo`}/> : null,
			kind: <OrganizationKindIcon kind={data.kind} size="small"/>,
			name: data.name,
			location: data.detail.location,
			members: data.membersCount,
			verified: getVerificationIcon(data.state.hasBeenVerified),
			deleted: getDeletedIcon(data.state.hasBeenDeleted),
		})
	}

	const usersColumns = [
		{ selector: 'menu', name: '', sortable: true, width: "48px", compact: true },
		{	selector: 'Id', name: 'ID', sortable: true },
		{ selector: 'logo', name: 'Logo' },
		{	selector: 'kind', name: 'Kind' },
		{	selector: 'name', name: 'Nome', sortable: true },
		{	selector: 'location', name: 'Luogo', sortable: true },
		{	selector: 'members', name: 'Membri', sortable: true },
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

