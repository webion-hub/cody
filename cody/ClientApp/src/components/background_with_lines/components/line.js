import { makeStyles } from '@material-ui/core/styles';
import { Color } from 'src/lib/color/color';

const useStyles = makeStyles((theme) => ({
	line: props => ({
		height: 80,
		borderRadius: 40,
		background: Color.set(props.color).darkness(theme.palette.type === "dark" ? 8 : 4).color,
		margin: 10,
	}),
}));

export function Line(props){
  const classes = useStyles(props);

	const randomValue = (min, max) => {	
		return min + Math.random() * (max - min);
	}

	return(
		<div 
			className={classes.line} 
			style={{
				maxWidth: `${randomValue(10, 45)}%`,
				width: "100%",
				transition: "5s max-width",
				transitionDelay: "0.5s",
			}}
		/>
	);
}