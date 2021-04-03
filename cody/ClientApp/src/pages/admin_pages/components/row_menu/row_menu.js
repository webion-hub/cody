import React from 'react';

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Menu } from '@material-ui/core';
import { DataTableContext } from 'src/pages/admin_pages/components/data_table_base';
import { VerifyMenuItem } from './verify_menu_item';
import { DeleteMenuItem } from './delete_menu_item';
import { ResotreMenuItem } from './restore_menu_item';
import { DeleteForeverMenuItem } from './delete_forever_menu_item';
import { EditRoleMenuItem } from './edit_role_menu_item';

const useStyles = makeStyles((theme) => ({
	menuBackground: {
		background: theme.palette.background.paperSecondary
	}
}));

export function RowMenu(props){
  const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
  const { refreshDataTable } = React.useContext(DataTableContext);

  const onDelete = props.onDelete;
  const onDeleteForever = props.onDeleteForever;
  const onEditRole = props.onEditRole;
  const onRestore = props.onRestore;
  const onVerify = props.onVerify;
  const id = props.data.id;
  const thereIsState = props.data.state !== undefined

	let disableVerifiyButton = true
	let disableDeleteButton = true
	let disableRestoreButton = true
  if(thereIsState){
    disableVerifiyButton = props.data.state.hasBeenVerified || props.data.state.hasBeenDeleted
    disableDeleteButton = props.data.state.hasBeenDeleted 
    disableRestoreButton = !props.data.state.hasBeenDeleted 
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
				<ResotreMenuItem
					disabled={disableRestoreButton}
					onRestore={handleRestore}
				/>
				<EditRoleMenuItem
					hide={!onEditRole}
					onEditRole={handleEditRole}
					id={id}
				/>
			</Menu>
		</>
	);
}