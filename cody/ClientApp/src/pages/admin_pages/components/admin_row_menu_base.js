import React from 'react';

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { MenuWithLoading } from 'src/components/menu/menu_with_loading';

const useStyles = makeStyles((theme) => ({
	menuBackground: {
		background: theme.palette.background.paperSecondary
	}
}));

export function AdminRowMenuBase(props){
  const classes = useStyles();

	const {
		children,
		loading,
		open,
		onMenuOpen,
		onMenuClose,
	} = props

	return (
		<>
			<IconButton
				onClick={onMenuOpen}
			>
				<MoreVertRoundedIcon/>
			</IconButton>
			<MenuWithLoading
				anchorEl={open}
				loading={loading}
				keepMounted
				open={Boolean(open)}
				onClose={onMenuClose}
				classes={{
					paper: classes.menuBackground
				}}
			>
				{children}
			</MenuWithLoading>
		</>
	)
}