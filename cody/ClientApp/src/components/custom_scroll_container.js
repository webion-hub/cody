import React, { useLayoutEffect, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { Box, Grid, IconButton } from '@material-ui/core'
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

import { getWindowDimensions } from 'src/lib/window_dimensions'

export function CustomScrollContainer(props){
	const theme = useTheme();
	const content = useRef();
	const scroll = useRef();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

	const [height, setHeight] = React.useState(0);
	const arrowWidth = 48;

  useLayoutEffect(() => {

    const updateHeight = () => {
			if(getContentExist()){
				if(!props.height)
					setHeight(content.current? content.current.offsetHeight : 0);
				else
					setHeight(props.height);
			}
    }

    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, [content.current]);

	const getContentExist = () => {
		return content.current !== null 
			&& content.current !== undefined
	}

	const getScrollStep = () => { 
		const arrowsWidth = arrowWidth*2;
		const elementsPadding = props.elementsPadding? props.elementsPadding : 0
		return getWindowDimensions().width - arrowsWidth + elementsPadding;
	}
	
	const scrollTo = (direction) => {
		if(getContentExist()){
			const position = scroll.current.scrollLeft/getScrollStep();
			const relativePosition = position - Math.floor(position)

			if(direction === "next"){
					scroll.current.scrollTo({
					left: Math.floor(position + 1) * getScrollStep(),
					behavior: 'smooth'
				})
			}
			if(direction === "back"){
				if(relativePosition === 0)
					scroll.current.scrollTo({
						left: Math.floor(position - 1) * getScrollStep(),
						behavior: 'smooth'
					})			
				else
					scroll.current.scrollTo({
						left: Math.floor(position) * getScrollStep(),
						behavior: 'smooth'
					})	
			}
		}
	}



	const contentWithoutScrollBar = 
		<div
			style={{
				overflow: "hidden",
				height: height,
			}}
		>
			<div
				ref={scroll}
				style={{
					overflow: "scroll",
					overflowY: "hidden",
					height: height + 5,
				}}
			>
				<div
					ref={content}
				>
					{props.children}
				</div>
			</div>
		</div>

	const contentWithScrollBar = 
		<div 
			ref={scroll}
			style={{overflow: "auto"}}
		>
			{props.children}
		</div>
		
	const mobileContent = 
		props.hideScrollbars ? 
			contentWithoutScrollBar
			:
			contentWithScrollBar

	const mobileContentWithArrows = 
		<Grid
			container
			direction="row"
			justify="space-evenly"
			alignItems="center"
		>
			<IconButton
				onClick={() => scrollTo("back")}
			>
				<ArrowBackIosRoundedIcon/>
			</IconButton>
			<Box width="calc(100vw - 96px)">
				{mobileContent}
			</Box>
			<IconButton
				onClick={() => scrollTo("next")}
				>
				<ArrowForwardIosRoundedIcon/>
			</IconButton>
		</Grid>

	return (
		<>
			{
				mobileView ?
					props.arrows ? 
						mobileContentWithArrows : mobileContent		
				:
				<ScrollContainer
					hideScrollbars={props.hideScrollbars}
					ignoreElements=".noScroll"
					nativeMobileScroll
				>
					{props.children}
				</ScrollContainer>
			}
		</>

  );

}