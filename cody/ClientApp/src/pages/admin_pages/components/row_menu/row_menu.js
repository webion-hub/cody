import React from 'react';

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

import { makeStyles } from '@material-ui/core/styles';
import { Fade, IconButton, LinearProgress, Menu } from '@material-ui/core';
import { DataTableContext } from 'src/pages/admin_pages/components/data_table_base';
import { VerifyMenuItem } from './verify_menu_item';
import { DeleteMenuItem } from './delete_menu_item';
import { RestoreMenuItem as RestoreMenuItem } from './restore_menu_item';
import { DeleteForeverMenuItem } from './delete_forever_menu_item';
import { EditRoleMenuItem } from './edit_role_menu_item';
import { MenuWithLoading } from 'src/components/menu/menu_with_loading';
import { useMenu } from 'src/lib/hooks/use_menu';


const useStyles = makeStyles((theme) => ({
	menuBackground: {
		background: theme.palette.background.paperSecondary
	}
}));

export function RowMenu(props) {
  const classes = useStyles();
	const [loading, setLoading] = React.useState(false);
  const { refreshDataTable } = React.useContext(DataTableContext);

	const {
    handleOpenMenu,
    handleCloseMenu,
    isMenuOpen,
  } = useMenu()

  const {
		onDelete,
  	onDeleteForever,
  	onEditRole,
  	onRestore,
  	onVerify,
		data: {id, state},
	} = props;
  
	let disableVerifyButton = true;
	let disableDeleteButton = true;
	let disableRestoreButton = true;
  if (state !== undefined) {
    disableVerifyButton = state.hasBeenVerified || state.hasBeenDeleted
    disableDeleteButton = state.hasBeenDeleted 
    disableRestoreButton = !state.hasBeenDeleted 
  }

  const handleDelete = () => {
		setLoading(true)
    onDelete(id).finally(_ => {
			setLoading(false)
			refreshDataTable();
		});
  }

  const handleRestore = () => {
		setLoading(true)
    onRestore(id).finally(_ => {
			setLoading(false)
			refreshDataTable();
		});
  }

	const handleVerify = () => {
		setLoading(true)
    onVerify(id).finally(_ => {
			setLoading(false)
			refreshDataTable();
		});
  }

	const handleDeleteForever = () => {
		setLoading(true)
    onDeleteForever(id).finally(_ => {
			setLoading(false)
			refreshDataTable();
		});
  }

  const handleEditRole = (data) => {
		setLoading(true)
    onEditRole(data).finally(_ => {
			setLoading(false)
			refreshDataTable();
		});
  }

	return (
		<>
			<IconButton
				onClick={handleOpenMenu}
			>
				<MoreVertRoundedIcon/>
			</IconButton>
			<MenuWithLoading
				anchorEl={isMenuOpen}
				loading={loading}
				keepMounted
				open={Boolean(isMenuOpen)}
				onClose={handleCloseMenu}
				classes={{
					paper: classes.menuBackground
				}}
			>
				<VerifyMenuItem
					hide={!onVerify}
					disabled={disableVerifyButton}
					onVerify={handleVerify}
				/>
				<EditRoleMenuItem
					hide={!onEditRole}
					onEditRole={handleEditRole}
					onMenuClose={handleCloseMenu}
					id={id}
				/>
				<RestoreMenuItem
					disabled={disableRestoreButton}
					onRestore={handleRestore}
				/>
				<DeleteMenuItem
					disabled={disableDeleteButton}
					onDelete={handleDelete}
				/>
				<DeleteForeverMenuItem
					hide={!onDeleteForever}
					onDeleteForever={handleDeleteForever}
					onMenuClose={handleCloseMenu}
					id={id}
					username={props.data.username}
				/>
			</MenuWithLoading>
		</>
	);
}