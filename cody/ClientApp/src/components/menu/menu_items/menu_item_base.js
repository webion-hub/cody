import React from 'react';
import { Typography, ListItemIcon, MenuItem } from '@material-ui/core';

export const MenuItemBase = React.forwardRef((props, ref) => {
	const {
		color,
		label,
		hide,
		...menuItemProps
	} = props

	if(hide)
		return null;

	return (
		<MenuItem
      ref={ref}
			{...menuItemProps}
		>
			<ListItemIcon>
				<props.icon color={color} fontSize="small"/>
			</ListItemIcon>
			<Typography color={color} variant="inherit" noWrap>
				{label}
			</Typography>
		</MenuItem>
	);
})