import React, { useLayoutEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	line: {
		height: 80,
		borderRadius: 40,
		background: theme.palette.background.backgroundTransparent,
		margin: 10,
	},
	linesBox: {
		position: "absolute",
		top: 0,
		zIndex: -2,
		width: "100%",
		height: "100%",
		overflow: "hidden",
    whiteSpace: "nowrap",
		background: theme.palette.background.backgroundGradient
	},
}));

export function BackgroundWithLines(props){
  const classes = useStyles();
	const box = useRef();

  const [elementsNumber, setElementsNumber] = React.useState(0);
  useLayoutEffect(() => {
    window.addEventListener('resize', updateElementsNumber);
    updateElementsNumber();
    return () => window.removeEventListener('resize', updateElementsNumber);

  }, []);

	const updateElementsNumber = () => {
		const elementsFromBox = box.current? 
			Math.round(box.current.offsetHeight/100) : 0

		const height = props.height === 1 ? window.innerHeight : props.height;
		const elementsFromHeight = Math.round(height/100)

		const extraLine = props.extraLine ? 1 : 0
		const removeLine = props.removeLine ? -1 : 0

		const elements = props.height? 
			elementsFromHeight : elementsFromBox

		setElementsNumber(elements + extraLine + removeLine);
	}

	const lines = [];
	for(var i=0; i < elementsNumber; i++){
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
		<div
			ref={box}
			className={classes.linesBox}
		>
			{
				lines.map(line => line)
			}
		</div>
  );
}


function Line(){
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