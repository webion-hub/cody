import { makeStyles } from '@material-ui/core/styles';
import { useWaves } from './use_waves';

const useStyles = makeStyles((theme) => ({
  wavedBackground: props => ({
    background: theme.palette.background[600],
    backgroundImage: `url("${props.waves}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  }),
}));

export function useBackgroundWaves(settings) {
  const waves = useWaves(settings ? settings : null)
  const classes = useStyles({waves});

  return classes.wavedBackground;
}