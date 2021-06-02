import React from 'react';

import { DataTableContext } from 'src/pages/admin_pages/components/data_table_base';
import { useMenu } from 'src/lib/hooks/use_menu';
import Organization from 'src/lib/server_calls/organization';
import { AdminRowMenuBase } from '../../components/admin_row_menu_base';
import { VerifyOrganizationMenuItem } from 'src/components/menu/menu_items/verify_organization_menu_item';
import { RestoreMenuItem } from 'src/components/menu/menu_items/restore_menu_item';
import { DeleteMenuItem } from 'src/components/menu/menu_items/delete_menu_item';

export function AdminOrganizationMenu(props) {
	const [loading, setLoading] = React.useState(false);
  const { refreshDataTable } = React.useContext(DataTableContext);

  const {
		data: { id, state },
	} = props;

	const {
    handleOpenMenu,
    handleCloseMenu,
    isMenuOpen,
		anchor
  } = useMenu()

	const organization = Organization.withId(id);
  
	const disableVerifyButton = state?.hasBeenVerified || state?.hasBeenDeleted
	const disableDeleteButton = state?.hasBeenDeleted 
	const disableRestoreButton = !state?.hasBeenDeleted 

	return (
		<AdminRowMenuBase
			key={id}
			loading={loading}
			onMenuOpen={handleOpenMenu}
			onMenuClose={handleCloseMenu}
			anchorEl={anchor}
			open={isMenuOpen}
		>
			<VerifyOrganizationMenuItem
				disabled={disableVerifyButton}
				onVerify={refreshDataTable}
				setLoading={setLoading}
				handler={organization}
			/>
			<RestoreMenuItem
				disabled={disableRestoreButton}
				onRestore={refreshDataTable}
				setLoading={setLoading}
				handler={organization}
			/>
			<DeleteMenuItem
				disabled={disableDeleteButton}
				onDelete={refreshDataTable}
				setLoading={setLoading}
				handler={organization}
			/>
		</AdminRowMenuBase>
	);
}