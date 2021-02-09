import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	line: {
		height: 80,
		borderRadius: 40,
		background: "rgba(0,0,0,0.1)",
		margin: 10,
	},
	linesBox: {
		position: "absolute",
		top: 0,
		zIndex: -2,
		width: "100%",
		background: "linear-gradient(180deg, rgb(26 42 79 / 85%) 0%, rgb(23 36 63 / 45%) 50%, rgba(17, 26, 37, 0) 100%)"
	}
}));

export function BackgroundWithLines(props){
  const classes = useStyles();

	const lines = [];
	for(var i=0; i < 10; i++){
		lines.push(
			<Grid
				key={i}
				container
				direction="row"
				justify="space-between"
			>
				<Line/>
				<Line/>
			</Grid>
		);
	}

  return(
		<div className={classes.linesBox}>
			{
				lines.map(line => line)
			}
		</div>
  );
}


function Line(props){
  const classes = useStyles();

	const randomValue = (min, max) => {	
		return min + Math.random() * (max - min);
	}

	return(
		<div 
			className={classes.line} 
			style={{
				maxWidth: `${randomValue(10, 45)}vw`,
				width: "100%"
			}}
		/>
	);
}