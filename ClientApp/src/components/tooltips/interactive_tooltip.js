import { Tooltip } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { EventsDispatcher } from 'src/lib/events_dispatcher';
import { useListener } from 'src/lib/hooks/use_listener';
import { PopperWithAwayListener } from './popper_with_away_listener';

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 0
  }
}));

export function InteractiveTooltip(props){
  const {
    children,
    canOpen,
    classes: classesFromProps,
    ...other
  } = props

  const [open, setOpen] = React.useState(false)
	const classes = useStyles();

  const generateKey = () => {
    return Math.random().toString(36).substring(2, 15) 
      + Math.random().toString(36).substring(2, 15);
  }

  const ref = React.useRef(generateKey())
  const key = ref.current

  const handleOpen = () => {
    setOpen(true)
    EventsDispatcher.setEvent('close-interactive-tooltips').update(key)
  }

  const handleCloseEvent = (keyArg) => {
    if(keyArg[0] === key)
      return
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useListener({
    controller: EventsDispatcher.setEvent('close-interactive-tooltips'),
    removeFirstExecution: true,
    eventFunction: handleCloseEvent
  }, [])

  const childrenWithProps =  React.cloneElement(children, {
    onTouchStart: handleOpen,
    onMouseEnter: handleOpen,
    onMouseLeave: handleClose,
  });

  return (
    <Tooltip
      {...other}
      open={open && canOpen}
      arrow
      interactive
      classes={{
        ...classesFromProps,
        popper: classes.popper
      }}
      PopperComponent={PopperWithAwayListener}
      PopperProps={{
        onMouseEnter: handleOpen,
        onMouseLeave: handleClose,
        onClickAway: handleClose,
        onClick: e => {
          e.stopPropagation()
          e.preventDefault()
        }
      }}
    >  
      {childrenWithProps}
    </Tooltip>
  )
}

InteractiveTooltip.defaultProps =  {
  canOpen: true
}