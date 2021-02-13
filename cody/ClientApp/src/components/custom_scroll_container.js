import React, { useEffect, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

export function CustomScrollContainer(props){
	const theme = useTheme();
	const content = useRef();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
	const [height, setHeight] = React.useState(0);

	useEffect(() => {		
		setHeight(
			content.current ? 
				content.current.offsetHeight : 0
		);
	}, [content.current])

	const contentWithScrollBar = 
		<div
			style={{
				overflow: "hidden",
				height: height,
			}}
		>
			<div
				style={{
					overflow: "scroll",
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

	const contentWithoutScrollBar = 
		<div style={{overflow: "auto"}}>
			{props.children}
		</div>
		
	const mobileContent = 
		props.hideScrollbars ? 
			contentWithScrollBar
			:
			contentWithoutScrollBar

  return (
		<>
			{
				mobileView ?				
					mobileContent
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