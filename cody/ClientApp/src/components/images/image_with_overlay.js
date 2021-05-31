import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Color } from 'src/lib/color/color';

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative"
  },
  overlay: props => ({
    position: "absolute",
    zIndex: 1,
    height: "100%",
    opacity: props.showOverlay ? 1 : 0,
    transform: props.showOverlay ? props.scale : undefined,
    background: Color.o(theme.palette.secondary.main, 0.75),
    "&:hover": {
      opacity: 1,
      transform: props.scale
    },
    transition: "0.25s all" 
  }),
  showOverlay: {
    opacity: 1
  },
  roundImage: {
    borderRadius: "50%"
  }
}));

export function ImageWithOverlay(props){
  const showOverlay = props.showOverlay
  const isRound = props.cropShape === "round"

  const disableScale = !isRound
  const scale = disableScale 
    ? undefined
    : "scale(1.1)"

  const classes = useStyles({showOverlay, scale})

  return (
    <div className={`${classes.container} ${props.className}`}>
      <Grid
        className={`${classes.overlay} ${isRound ? classes.roundImage : ""}`}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {props.overlayContent}
      </Grid>
      {props.children}
    </div>
  )
}

ImageWithOverlay.defaultProps = {
  cropShape: "round",
  className: ""
}