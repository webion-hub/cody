import React from 'react';

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Menu } from '@material-ui/core';
import { DataTableContext } from 'src/pages/admin_pages/components/data_table_base';
import { VerifyMenuItem } from './verify_menu_item';
import { DeleteMenuItem } from './delete_menu_item';
import { RestoreMenuItem as RestoreMenuItem } from './restore_menu_item';
import { DeleteForeverMenuItem } from './delete_forever_menu_item';
import { EditRoleMenuItem } from './edit_role_menu_item';


const useStyles = makeStyles((theme) => ({
	menuBackground: {
		background: theme.palette.background.paperSecondary
	}
}));

export function RowMenu(props) {
  const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
  const { refreshDataTable } = React.useContext(DataTableContext);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDelete = () => {
    onDelete(id)
    refreshDataTable()
  }

  const handleRestore = () => {
    onRestore(id)
    refreshDataTable()
  }

	const handleVerify = () => {
    onVerify(id)
    refreshDataTable()
  }

	const handleDeleteForever = () => {
    onDeleteForever(id)
    refreshDataTable()
  }

  const handleEditRole = (data) => {
    onEditRole(data)
    refreshDataTable()
  }

	return (
		<>
			<IconButton
				onClick={handleClick}
			>
				<MoreVertRoundedIcon/>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				classes={{
					paper: classes.menuBackground
				}}
			>
				<VerifyMenuItem
					hide={!onVerify}
					disabled={disableVerifiyButton}
					onVerify={handleVerify}
				/>
				<EditRoleMenuItem
					hide={!onEditRole}
					onEditRole={handleEditRole}
					onMenuClose={_ => setAnchorEl(null)}
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
					disabled={disableDeleteButton}
					onDeleteForever={handleDeleteForever}
					onMenuClose={_ => setAnchorEl(null)}
					id={id}
					username={props.data.username}
				/>
			</Menu>
		</>
	);
}