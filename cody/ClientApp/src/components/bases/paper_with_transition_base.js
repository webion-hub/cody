import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PaperWithWaves } from '../paper_with_waves';

const useStyles = makeStyles((theme) => ({
  paperBox: props => ({
    position: "relative",
    width: "100%",
    maxWidth: props.width,
    height: props.height,
    overflow: props.overflow,
    [theme.breakpoints.down('xs')]: {
      width: "100vw",
      minHeight: `calc(100vh - ${theme.appBar.mobileHeight + props.removeHeightOnMobile}px)`,
      height: "auto",
    },
    transition: "max-width 0.25s, height 0.25s",
  }),
  childrenContainer: {
    padding: theme.spacing(2),
    "& > *": {
      animation: `$fade 0.5s linear`,
    }
  },
  "@keyframes fade": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  },
}));

export function PaperWithTransitionBase(props){
  const classes = useStyles(props);

  return(
    <props.component
      className={classes.paperBox}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        {props.title}
        <Grid
          className={classes.childrenContainer}
          container
          direction={props.direction}
          alignItems="center"
        >
          {props.children}
        </Grid>
      </Grid>
    </props.component>
  );
}

PaperWithTransitionBase.defaultProps = {
  overflow: "hidden",
  width: "auto",
  height: "auto",
  removeHeightOnMobile: 0,
  component: PaperWithWaves
}
