import React, { useEffect, useRef } from 'react';

import { Box, Grid, IconButton } from '@material-ui/core'
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

import { useGetSize } from 'src/lib/hooks/use_get_size';

export function CustomScrollContainer(props){
	const theme = useTheme();
	const contentRef = useRef();
	const scrollRef = useRef();
	const screenWidth = useGetSize(window).width;
	const contentRefHeight = useGetSize(contentRef).height;
	const childrenHeight = props.height ? props.height : contentRefHeight;

  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
	const arrowWidth = 48;

	const [activeDrag, setActiveDrag] = React.useState(false);
	const [usingAnotherOne, setUsingAnotherOne] = React.useState(false);

	//on each render
  // eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const noScrollElements = scrollRef.current.querySelectorAll('.noScroll');
		noScrollElements.forEach.call(noScrollElements, (element) => {
			element.addEventListener('mousedown', () => {
				setUsingAnotherOne(true)
			})
		})
	})

	//handle scrollable container reset
  // eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		window.addEventListener('mouseup', resetScrollableContainer)

    return () => window.removeEventListener("mouseup", resetScrollableContainer);
	}, [scrollRef.current])

	//handle scrollable container drag
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
    if (activeDrag) 
			window.addEventListener("mousemove", handleDrag);

    return () => window.removeEventListener("mousemove", handleDrag);
	}, [activeDrag])


	const resetScrollableContainer = () => {
		setActiveDrag(false)
		setUsingAnotherOne(false)
		scrollRef.current.style.cursor = "auto"
		scrollRef.current.style.userSelect = "auto"
	}
	
	const getContentExist = () => {
		return contentRef.current !== null 
			&& contentRef.current !== undefined
	}

	const getScrollStep = () => { 
		const arrowsWidth = arrowWidth*2;
		const elementsPadding = props.elementsPadding? props.elementsPadding : 0
		return screenWidth - arrowsWidth + elementsPadding;
	}



	//Handlers
	const handleScrollTo = (direction) => {
		if(getContentExist()){
			const position = scrollRef.current.scrollLeft/getScrollStep();
			const relativePosition = position - Math.floor(position)

			if(direction === "next"){
					scrollRef.current.scrollTo({
					left: Math.floor(position + 1) * getScrollStep(),
					behavior: 'smooth'
				})
			}
			if(direction === "back"){
				if(relativePosition === 0)
					scrollRef.current.scrollTo({
						left: Math.floor(position - 1) * getScrollStep(),
						behavior: 'smooth'
					})			
				else
					scrollRef.current.scrollTo({
						left: Math.floor(position) * getScrollStep(),
						behavior: 'smooth'
					})	
			}
		}
	}

	let oldPosition = 0;
	const handleDrag = (event) => {
		if(!usingAnotherOne){
			scrollRef.current.style.cursor = "grab"
			scrollRef.current.style.userSelect = "none"
	
			if(oldPosition == 0)
				oldPosition = event.pageX;
			const step = event.pageX - oldPosition
			scrollRef.current.scrollLeft -= step
	
			oldPosition = event.pageX
		}
	}


	//create content
	const content = 
		<div
			style={{
				overflow: "hidden",
				height: childrenHeight,
			}}
		>
			<div
				onMouseDown={() => setActiveDrag(true)}
				ref={scrollRef}
				className={"noScroll"}
				style={{
					overflow: "scroll",
					overflowY: "hidden",
					height: childrenHeight + 5,
				}}
			>
				<div
					ref={contentRef}
				>
					{props.children}
				</div>
			</div>
		</div>
		
	const contentWithArrows = 
		<Grid
			container
			direction="row"
			justify="space-evenly"
			alignItems="center"
		>
			<IconButton
				onClick={() => handleScrollTo("back")}
			>
				<ArrowBackIosRoundedIcon/>
			</IconButton>
			<Box width="calc(100vw - 96px)">
				{content}
			</Box>
			<IconButton
				onClick={() => handleScrollTo("next")}
				>
				<ArrowForwardIosRoundedIcon/>
			</IconButton>
		</Grid>

	return (
		<>
			{
				props.arrows && mobileView ? 
					contentWithArrows : content	
			}
		</>

  );

}