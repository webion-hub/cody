import { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, useTheme } from '@material-ui/core';

import { Line } from './components/line';
import { useGetSize } from 'src/lib/hooks/use_get_size';

const useStyles = makeStyles((theme) => ({
	linesBox: props => ({
		position: "absolute",
		top: 0,
		zIndex: -2,
		width: "100%",
		height: "100%",
		overflow: "hidden",
    whiteSpace: "nowrap",
		background: props.background
	}),
}));

export function BackgroundWithLines(props){
	const theme = useTheme()
	const background = props.background ?? theme.palette.background[500]

  const classes = useStyles({background});
	const box = useRef();
	const boxHeight = useGetSize(box).height;
	const elementsNumber = Math.round(boxHeight / 100);

	const lines = [...Array(elementsNumber)]
		.map((_, index) => (
			<Grid
				key={index}
				container
				direction="row"
				justify="space-between"
			>
				<Line color={background}/>
				<Line color={background}/>
			</Grid>
		))

  return(
		<div
			ref={box}
			className={classes.linesBox}
		>
			{lines}
		</div>
  );
}