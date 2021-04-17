import React from 'react';

import { DataTableContext } from 'src/pages/admin_pages/components/data_table_base';
import { useMenu } from 'src/lib/hooks/use_menu';
import { Admin } from 'src/lib/server_calls/admin';
import { AdminRowMenuBase } from '../../admin_row_menu_base';
import { RestoreMenuItem } from 'src/components/menu/menu_items/restore_menu_item';
import { DeleteMenuItem } from 'src/components/menu/menu_items/delete_menu_item';
import { DeleteForeverMenuItem } from 'src/components/menu/menu_items/delete_forever_menu_item';
import { EditRoleMenuItem } from 'src/components/menu/menu_items/edit_role_menu_item';

export function AdminUserMenu(props) {
	const [loading, setLoading] = React.useState(false);
  const { refreshDataTable } = React.useContext(DataTableContext);

  const {
		data: {id, state, username},
	} = props;

	const {
    handleOpenMenu,
    handleCloseMenu,
    isMenuOpen,
  } = useMenu()

	const user = Admin.User.withId(id);
  
	const disableDeleteButton = state?.hasBeenDeleted 
	const disableRestoreButton = !state?.hasBeenDeleted 

	return (
		<AdminRowMenuBase
			key={id}
			loading={loading}
			onMenuOpen={handleOpenMenu}
			onMenuClose={handleCloseMenu}
			open={isMenuOpen}
		>
			<EditRoleMenuItem
				onEditRole={refreshDataTable}
				setLoading={setLoading}
				handler={user}
			/>
			<RestoreMenuItem
				disabled={disableRestoreButton}
				onRestore={refreshDataTable}
				setLoading={setLoading}
				handler={user}
			/>
			<DeleteMenuItem
				disabled={disableDeleteButton}
				onDelete={refreshDataTable}
				setLoading={setLoading}
				handler={user}
			/>
			<DeleteForeverMenuItem
				onDeleteForever={refreshDataTable}
				username={username}
				handler={user}
			/>
		</AdminRowMenuBase>
	);
}