import { Tooltip } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
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

  const childrenWithProps =  React.cloneElement(children, {
    onTouchStart: _ => setOpen(true),
    onMouseEnter: _ => setOpen(true),
    onMouseLeave: _ => setOpen(false),
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
        onMouseEnter: _ => setOpen(true),
        onMouseLeave: _ => setOpen(false),
        onClickAway: _=> setOpen(false)
      }}
    >  
      {childrenWithProps}
    </Tooltip>
  )
}

InteractiveTooltip.defaultProps =  {
  canOpen: true
}