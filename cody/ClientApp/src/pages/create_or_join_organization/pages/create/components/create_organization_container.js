import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingButton } from 'src/components/buttons/loading_button';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';

const useStyles = makeStyles((theme) => ({
  container: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
    minHeight: 388,
    [theme.breakpoints.down('xs')]: {
      maxWidth: "100%",
      width: `calc(100% - ${theme.spacing(2)}px)`,
      minHeight: "calc(100vh - 104px)"
    },
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));


export function CreateOrganizationContainer(props){
  const classes = useStyles();
  const mobileView = useMobileView()

  return(
    <Grid
      className={classes.container}
      container
      direction="column"
      alignItems="center"
      justify={mobileView ? "center" : "space-between"}
    >
      {props.children}
      <LoadingButton
        className={classes.button}
        variant="contained"
        color="primary"
        href={props.href}
        onClick={props.onClick}
        label={props.label}
        loading={props.loading}
      />
    </Grid>
  );
}