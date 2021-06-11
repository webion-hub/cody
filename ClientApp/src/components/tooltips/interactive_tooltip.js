import { Tooltip } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { EventsDispatcher } from 'src/lib/events_dispatcher';
import { useListener } from 'src/lib/hooks/use_listener';
import { KeyGenerator } from 'src/lib/key_generator';
import { PopperWithAwayListener } from './popper_with_away_listener';

export function InteractiveTooltip(props){
  const {
    children,
    canOpen,
    ...other
  } = props

  const [open, setOpen] = React.useState(false)

  const ref = React.useRef(KeyGenerator.generate())
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