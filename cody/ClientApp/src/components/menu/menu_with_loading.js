import React from 'react';
import { Fade, LinearProgress, Menu } from '@material-ui/core';

export function MenuWithLoading(props){
	const {
		loading,
		children,
		...otherProps
	} = props

	const childrenWithProps = React.Children
		.map(children, child =>
			React.cloneElement(child, { 
				loading: child.props.loading || loading, 
				disabled: child.props.disabled || loading 
			})
		);

	return (
		<Menu
			{...otherProps}
		>
			<Fade in={loading}>
				<LinearProgress color="secondary"/>
			</Fade>
			{childrenWithProps}
		</Menu>
	)
}