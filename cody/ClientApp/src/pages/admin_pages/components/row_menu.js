import React from 'react';

import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import RestoreRoundedIcon from '@material-ui/icons/RestoreRounded';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import { DataTableContext } from 'src/pages/admin_pages/components/data_table_base';

const useStyles = makeStyles((theme) => ({
	menuBackground: {
		background: theme.palette.background.paperSecondary
	}
}));

export function RowMenu(props){
  const classes = useStyles();
  const onDelete = props.onDelete;
  const onRestore = props.onRestore;
  const onVerify = props.onVerify;
  const id = props.data.id;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { refreshDataTable } = React.useContext(DataTableContext);
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
				{
					onVerify ?
						<MenuItem
							onClick={handleVerify}
							disabled={disableVerifiyButton}
						>
							<ListItemIcon>
								<BeenhereRoundedIcon fontSize="small"/>
							</ListItemIcon>
							<Typography variant="inherit" noWrap>
								Verifica
							</Typography>
						</MenuItem>
						:
						null
				}
				<MenuItem
					onClick={handleDelete}
					disabled={disableDeleteButton}
				>
					<ListItemIcon>
						<DeleteRoundedIcon fontSize="small"/>
					</ListItemIcon>
					<Typography variant="inherit" noWrap>
						Cancella
					</Typography>
				</MenuItem>
        <MenuItem
					onClick={handleRestore}
					disabled={disableRestoreButton}
				>
					<ListItemIcon>
						<RestoreRoundedIcon fontSize="small"/>
					</ListItemIcon>
					<Typography variant="inherit" noWrap>
						Ripristina
					</Typography>
				</MenuItem>
			</Menu>
		</>
	);
}