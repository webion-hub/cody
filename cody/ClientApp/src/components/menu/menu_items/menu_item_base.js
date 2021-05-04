import React from 'react';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

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