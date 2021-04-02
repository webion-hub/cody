import React from 'react';
import { Typography, ListItemIcon, MenuItem } from '@material-ui/core';

export const MenuItemBase = React.forwardRef((props, ref) => {
	return (
		<MenuItem
      ref={ref}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			<ListItemIcon>
				<props.icon color={props.color} fontSize="small"/>
			</ListItemIcon>
			<Typography color={props.color} variant="inherit" noWrap>
				{props.label}
			</Typography>
		</MenuItem>
	);
})