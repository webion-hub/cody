import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { Line } from './components/line';
import { useGetSize } from 'src/lib/hooks/use_get_size';

const useStyles = makeStyles((theme) => ({
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

export function BackgroundWithLines(){
  const classes = useStyles();
	const box = useRef();
	const boxHeight = useGetSize(box).height;
	const elementsNumber = Math.round(boxHeight / 100);

  return(
		<div
			ref={box}
			className={classes.linesBox}
		>
			{[...Array(elementsNumber)]
					.map((_, index) => (
						<Grid
							key={index}
							container
							direction="row"
							justify="space-between"
						>
							<Line/>
							<Line/>
						</Grid>
				))}
		</div>
  );
}