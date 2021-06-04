import { Tooltip } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import { useBackgroundWaves } from 'src/lib/hooks/use_background_waves';

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.background[750]
  },
  noPadding: {
    padding: 0,
  },
  tooltip: {
    color: "inherit"
  }
}));

export function TooltipWithWaves(props){
  const {
    children, 
    TooltipComponent,
    removePadding,
    classes: classesFromProps,
    ...other
  } = props

	const classes = useStyles();
  const classWithWaves = useBackgroundWaves()

  return (
    <TooltipComponent
      {...other}
      classes={{
        ...classesFromProps,
        tooltip: `${removePadding ? classes.noPadding : ""} ${classWithWaves} ${classes.tooltip}`,
        arrow: `${classes.arrow}`
      }}
    >
      {children}
    </TooltipComponent>
  )
}

TooltipWithWaves.defaultProps =  {
  TooltipComponent: Tooltip
}