import { DataTableBase } from 'src/pages/admin_pages/components/data_table_base';
import { Organizations } from 'src/lib/server_calls/organizations';
import { getDeletedIcon } from 'src/pages/admin_pages/lib/get_deleted_icon';
import { getVerificationIcon } from 'src/pages/admin_pages/lib/get_verification_icon';
import { OrganizationKindIcon } from 'src/components/icons/organization_kind_icon';
import { CustomAvatar } from 'src/components/avatars/custom_avatar';
import { AdminOrganizationMenu } from './admin_organization_menu';
import OrganizationImages from 'src/lib/server_calls/organization_images';

export default function OrganizationsList(props){

	const associateOrganizations = (settings) => {
		const list = settings.list;
		/**@type {import('src/lib/server_calls/organization').Cody.Organization} */
		const organization = settings.data;
		const index = settings.index;

		const menu = 
			<AdminOrganizationMenu 
				data={organization}
			/>

		const organizationLogo = organization.hasLogo
			? <CustomAvatar disableLoadingRing src={OrganizationImages.of(organization.id).url`/logo`}/>
			: null;

		list.push({
			menu: menu,
			id: index,
			Id: organization.id,
			logo: organizationLogo,
			kind: <OrganizationKindIcon kind={organization.kind} size="small"/>,
			name: organization.name,
			location: organization.detail.location,
			members: organization.membersCount,
			verified: getVerificationIcon(organization.state.hasBeenVerified),
			deleted: getDeletedIcon(organization.state.hasBeenDeleted),
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

