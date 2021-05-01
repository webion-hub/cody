import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: `calc(100vh - ${theme.appBar.fullHeight}px)`,
    position: "relative",
    [theme.breakpoints.down('xs')]: {
      minHeight: `calc(100vh - ${theme.appBar.mobileHeight}px)`,
    },
  },
}));

export function CenterComponentPageBase(props){
  const classes = useStyles();
  const className = `${classes.pageContainer} ${props.className}`

  return(
    <Grid
      className={className}
      container
      direction={props.direction}
      justify="center"
      alignItems="center"
    >
      {props.children}
    </Grid>
  );
}