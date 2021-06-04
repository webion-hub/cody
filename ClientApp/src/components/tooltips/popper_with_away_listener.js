import { ClickAwayListener, Popper } from '@material-ui/core'

export function PopperWithAwayListener(props){
  const {onClickAway, children, ...other} = props

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Popper {...other}>
        {children}
      </Popper>
    </ClickAwayListener>
  )
}