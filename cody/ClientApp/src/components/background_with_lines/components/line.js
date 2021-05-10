import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	line: {
		height: 80,
		borderRadius: 40,
		background: theme.palette.background[650].opacity(0.2),
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
				transition: "5s max-width",
				transitionDelay: "0.5s",
			}}
		/>
	);
}