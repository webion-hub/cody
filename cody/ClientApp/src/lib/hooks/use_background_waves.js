import { makeStyles } from '@material-ui/core/styles';
import { useWaves } from './use_waves';

const useStyles = makeStyles((theme) => ({
  wavedBackground: props => ({
    background: theme.palette.background.paperSecondary,
    backgroundImage: `url("${props.waves}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  }),
}));

export function useBackgroundWaves(asSvg) {
  const waves = useWaves()
  const classes = useStyles({waves});

  return classes.wavedBackground;
}