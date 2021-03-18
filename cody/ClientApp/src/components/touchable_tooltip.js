import React from 'react';

import { Tooltip } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  childrenContainer: {
    userSelect: "none",
  },
	keepOpenChildrenContainer: {
		userSelect: "none",
		"&:hover": {
			cursor: "pointer"
		}
	},
}));

export function TouchableTooltip(props){ 
  const classes = useStyles();
  const [openUsersList, setOpenUsersList] = React.useState(false);
  const [touching, setTouching] = React.useState(false);
  const [hover, setHover] = React.useState(false);

	const className = props.keepOpenOnClick ?
		classes.keepOpenChildrenContainer : classes.childrenContainer
	const finalClassName = `${className} ${props.className}`

	const handleTouch = (value) => {
		if(!props.keepOpenOnClick){
			setOpenUsersList(value)
			setTouching(value)
			setHover(true)
		}
	}

	const handleHover = (value) => {
		if(!props.keepOpenOnClick){
			if((!touching && !hover) || !value){
				setOpenUsersList(value)			
			}
			setHover(value)
		}
	} 

	
  return (
		<ClickAwayListener 
			onClickAway={() => setOpenUsersList(false)}
			mouseEvent="onMouseDown"
		>
			<Tooltip
				arrow={props.arrow}
				open={openUsersList && !props.disabled}
				interactive={props.interactive}
				placement={props.placement}
				title={props.title}
			>
				<div
					onTouchStart={() => handleTouch(true)}
					onTouchEnd={() => handleTouch(false)}
					onTouchCancel={() => handleTouch(false)}
					onTouchMove={() => handleTouch(false)}
					onTouchEndCapture={() => handleTouch(false)}
					onTouchMoveCapture={() => handleTouch(false)}					
					onTouchCancelCapture={() => handleTouch(false)}

					onMouseEnter={() => handleHover(true)}
					onMouseLeave={() => handleHover(false)}

					onClick={props.keepOpenOnClick ? () => setOpenUsersList(!openUsersList) : () => {}}

					className={finalClassName}
				>
					{props.children}
				</div>
			</Tooltip>
		</ClickAwayListener>
  );
}