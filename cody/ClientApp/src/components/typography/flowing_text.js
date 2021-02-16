import React, { createRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Colors } from 'src/lib/default_values/themes/colors/main_colors';

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

	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		const r = result ? parseInt(result[1], 16) : null;
		const g = result ? parseInt(result[2], 16) : null;
		const b = result ? parseInt(result[3], 16) : null;

		return result ? `rgb(${r}, ${g}, ${b})` : null;
	}

	const setOpacityColor = (color) => {
		let newColor = ""

		if(color.charAt(0) === '#'){
			const rgbColor = hexToRgb(color)

			newColor = "rgba"
			for(var i = 3; i < rgbColor.length - 1; i++){
				newColor += rgbColor[i];
			}

			newColor += ", 0)"
		}
		else if(color.substring(0,4) === "rgb(")
		{
			newColor = "rgba"
			for(var i = 3; i < color.length - 1; i++){
				newColor += color[i];
			}

			newColor += ", 0)"			
		}
		else if(color.substring(0,4) === "rgba")
		{
			newColor = "rgba"
			for(var i = 4; i < color.length - 2; i++){
				newColor += color[i];
			}

			newColor += "0)"			
		}

		return newColor;
	}

	useEffect(() => {
		setTextWidth(ref.current.offsetWidth);
		setTextHeight(ref.current.offsetHeight);
	}, []);
	
	const colorTransparent = setOpacityColor(props.background);
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