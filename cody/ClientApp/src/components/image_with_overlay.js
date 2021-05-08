import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Color } from 'src/lib/color/color';

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative"
  },
  overlay: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    opacity: 0,
    background: Color.setColor(theme.palette.secondary.main).opacity(0.25).color,
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