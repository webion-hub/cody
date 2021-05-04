import React from 'react';

import Grid from '@material-ui/core/Grid';
import useTheme from '@material-ui/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LoadingButton } from 'src/components/buttons/loading_button';

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
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

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