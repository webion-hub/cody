import React from 'react';

import { Tooltip } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';

export function TouchableTooltip(props){ 
  const [openUsersList, setOpenUsersList] = React.useState(false);
  const [touching, setTouching] = React.useState(false);
  const [hover, setHover] = React.useState(false);

	const handleTouch = (value) => {
		setOpenUsersList(value)
		setTouching(value)
		setHover(true)
	}

	const handleHover = (value) => {
		if(!touching && !hover || !value){
			setOpenUsersList(value)			
		}
		setHover(value)
	} 

  return (
		<ClickAwayListener onClickAway={() => setOpenUsersList(false)}>
			<Tooltip
				arrow={props.arrow}
				open={openUsersList}
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
				>
					{props.children}
				</div>
			</Tooltip>
		</ClickAwayListener>
  );
}