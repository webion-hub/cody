import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useListener } from 'src/lib/hooks/use_listener';
import { STDEventsDispatcher } from 'src/lib/std_events_dispatcher';
import { ForbiddenDragController } from './lib/forbidden_drag_controller';

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
    width: "100%",
    overflow: "auto",
		overflowY: "hidden"
	}
}));

export function CustomScrollContainer(props){
	const classes = useStyles();
	const scrollRef = useRef();

	const [activeDrag, setActiveDrag] = React.useState(false);
	const [forbiddenDrag, setForbiddenDrag] = React.useState(false);
	let oldPosition = 0;
	
	const handleForbiddenDrag = () => {
		setForbiddenDrag(true)
	}

	const resetScrollableContainer = () => {
		setActiveDrag(false)
		setForbiddenDrag(false)
		scrollRef.current.style.cursor = "auto"
		scrollRef.current.style.userSelect = "auto"
	}

	const handleDrag = (event) => {
		if(!activeDrag)
			return;
		if(forbiddenDrag)
			return;
			
		scrollRef.current.style.cursor = "grab"
		scrollRef.current.style.userSelect = "none"

		if(oldPosition == 0)
			oldPosition = event.pageX;
		const step = event.pageX - oldPosition
		scrollRef.current.scrollLeft -= step

		oldPosition = event.pageX
	}

	useListener({
		eventFunction: handleForbiddenDrag,
		controller: ForbiddenDragController.setController(scrollRef)
	}, [scrollRef])
	
	useListener({
		eventFunction: handleDrag,
		removeFirstExecution: true,
		controller: STDEventsDispatcher.setEvent("mousemove").on(window)
	})

	useListener({
		eventFunction: resetScrollableContainer,
		removeFirstExecution: true,
		controller: STDEventsDispatcher.setEvent("mouseup").on(window)
	})

	return (
		<div
			ref={scrollRef}
			className={`${props.className} ${classes.container}`}
			onMouseDown={() => setActiveDrag(true)}
		>
			{props.children}
		</div>
  );
}

CustomScrollContainer.defaultProps = {
	className: ""
}