import React, { createRef, useEffect } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { setOpacityColor } from 'src/lib/setOpacityColor';

const useStyles = makeStyles((theme) => ({
	container: {
		whiteSpace: "nowrap",
		overflow: "hidden",
	},
	typography: {
		userSelect: "none"
	},
	flowingText: {
		animation: "$flow linear",
		animationIterationCount: "infinite",
	},
	"@keyframes flow": {
		"to": {
			transform: "translate(100%, 0)",
		},
	}
}));
  
export function FlowingText(props){
	const classes = useStyles();
	
	const [flow, setFlow] = React.useState(false);
	const [textWidth, setTextWidth] = React.useState(null);
	const [textHeight, setTextHeight] = React.useState(null);

	const longText = textWidth > props.containerWidth
	const speed = 3 / 100;

	const ref = createRef();
	
	const handleMouseEnter = () => {
		if(longText)
			setFlow(true);
	}
	
	const handleMouseLeave = () => {
		setFlow(false);
	}

	useEffect(() => {
		setTextWidth(ref.current.offsetWidth);
		setTextHeight(ref.current.offsetHeight*1.5);

    // eslint-disable-next-line react-hooks/exhaustive-deps    
	}, [props.children]);
	
	const colorTransparent = setOpacityColor(props.background, 0);
	return (
		<Box
			position="relative"
			width={longText ? props.containerWidth : undefined}
			className={`${classes.container} ${props.className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}

			onTouchStart={handleMouseEnter}
			onTouchEnd={handleMouseLeave}
			onTouchCancel={handleMouseLeave}
			onTouchMove={handleMouseLeave}
			onTouchEndCapture={handleMouseLeave}
			onTouchMoveCapture={handleMouseLeave}					
			onTouchCancelCapture={handleMouseLeave}
	>
			<Box
				width={longText ? props.containerWidth : undefined}
				height={textHeight}
				position="absolute"
				zIndex={1}
				style={{
					background: flow ? 
						`linear-gradient(90deg,
							${props.background} 0%,
							${colorTransparent} 5%,
							${colorTransparent} 95%,
							${props.background} 100%)`
						:
						`linear-gradient(90deg,
							${colorTransparent} 0%,
							${colorTransparent} 5%,
							${colorTransparent} 95%,
							${props.background} 100%)`
				}}
			/>
			<div
				className={flow ? classes.flowingText : null}
				style={{
					transform: flow ? `translate(-${textWidth}px, 0)` : null,
					animationDuration: `${(textWidth + props.containerWidth)*speed}s`,
					animationDelay: `-${props.containerWidth*speed}s`,
					animationPlayState: flow ? "running" : "paused",
					animationDirection: "reverse"
				}}
			>
				<Typography 
					className={classes.typography}
					innerRef={ref}
					variant={props.variant} 
					color={props.color}
					component="span"
				>
					{props.children}
				</Typography>
			</div>
		</Box> 
	);
}