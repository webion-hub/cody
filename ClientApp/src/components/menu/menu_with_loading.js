import React from 'react';
import { Fade, LinearProgress, Menu } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	menuList: {
		paddingTop: 4,
	}
}));

export function MenuWithLoading(props){
	const classes = useStyles();
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
			classes={{
				list: classes.menuList
			}}
		>
			<Fade in={loading}>
				<LinearProgress color="secondary"/>
			</Fade>
			{childrenWithProps}
		</Menu>
	)
}