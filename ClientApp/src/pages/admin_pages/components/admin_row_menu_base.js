import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

import { IconButton } from '@material-ui/core';
import { MenuWithLoading } from 'src/components/menu/menu_with_loading';

export function AdminRowMenuBase(props){
	const {
		children,
		loading,
		open,
		anchorEl,
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
				anchorEl={anchorEl}
				loading={loading}
				keepMounted
				open={open}
				onClose={onMenuClose}
			>
				{children}
			</MenuWithLoading>
		</>
	)
}