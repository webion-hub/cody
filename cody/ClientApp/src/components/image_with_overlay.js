import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setOpacityColor } from 'src/lib/setOpacityColor';

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative"
  },
  overlay: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    opacity: 0,
    background: setOpacityColor(theme.palette.secondary.main, 0.25),
    backdropFilter: "blur(10px)",
    "&:hover": {
      opacity: 1,
    },
    transition: "0.25s all" 
  },
  roundImage: {
    borderRadius: "50%"
  }
}));

export function ImageWithOverlay(props){
  const classes = useStyles()

  return (
    <div className={`${classes.container} ${props.className}`}>
      <Grid
        className={`${classes.overlay} ${props.cropShape === "round" ? classes.roundImage : ""}`}
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