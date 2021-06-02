import { Menu } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useBackgroundWaves } from "src/lib/hooks/use_background_waves";

const useStyles = makeStyles((theme) => ({
  menu: {
    padding: 0,
  },
}));

export function MenuWithWaves(props){
  const {children, ...other} = props
  const classWithWaves = useBackgroundWaves()
	const classes = useStyles();
  
  return (
    <Menu
      {...other}
      MenuListProps={{
        className: `${classes.menu} ${classWithWaves}`
      }}
    >
      {children}
    </Menu>
  )
}