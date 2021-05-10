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
    background: Color.o(theme.palette.secondary.main, 0.25),
    backdropFilter: "blur(10px)",
    "&:hover": {
      opacity: 1,
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
  const classes = useStyles({showOverlay})

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