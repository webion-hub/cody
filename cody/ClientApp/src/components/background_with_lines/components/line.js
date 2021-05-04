import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
	line: {
		height: 80,
		borderRadius: 40,
		background: theme.palette.background.backgroundTransparent,
		margin: 10,
	},
}));

export function Line(){
  const classes = useStyles();

	const randomValue = (min, max) => {	
		return min + Math.random() * (max - min);
	}

	return(
		<div 
			className={classes.line} 
			style={{
				maxWidth: `${randomValue(10, 45)}%`,
				width: "100%",
				transition: "5s all",
				transitionDelay: "0.5s",
			}}
		/>
	);
}