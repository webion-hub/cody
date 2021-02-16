import React, { createRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

const flowingTextStyles = makeStyles((theme) => ({
	container: {
		whiteSpace: "nowrap",
		overflow: "hidden",
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
	const classes = flowingTextStyles();
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
		setTextHeight(ref.current.offsetHeight);
	}, []);
	
	return (
		<Box
			position="relative"
			width={longText ? props.containerWidth : undefined}
			className={classes.container}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onTouchStart={handleMouseEnter}
			onTouchEnd={handleMouseLeave}
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
							transparent 5%,
							transparent 95%,
							${props.background} 100%)`
						:
						`linear-gradient(90deg,
							transparent 0%,
							transparent 5%,
							transparent 95%,
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