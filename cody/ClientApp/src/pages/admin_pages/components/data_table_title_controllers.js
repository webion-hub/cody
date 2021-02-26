import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { GenericSearchBar } from 'src/components/pickers/search_bar/generic_search_bar';

import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';

const useStyles = makeStyles((theme) => ({
	titleContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
  iconButton: {
    marginLeft: theme.spacing(1)
  },
  searchBar: {
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: "calc(100vw - 128px)"
    },
  }
}));

export function DataTableTitleControllers(props){
	const theme = useTheme();
  const classes = useStyles();

	return (
    <Grid
      container
      direction="column"
      className={classes.titleContainer}
      spacing={1}
    >
      <Grid item>
        <Typography variant="h4">
          {props.title}
        </Typography>
      </Grid>
      <Grid 
        item
        container
        direction="row"
      >
        <GenericSearchBar
          className={classes.searchBar}
          onSubmit={props.onSubmit}
          background={theme.palette.background.paper}
          label="Cerca"
          onChange={props.onChange}
        />
        <IconButton 
          className={classes.iconButton}
          onClick={props.onBack}
          disabled={props.disableBack}
        >
          <NavigateBeforeRoundedIcon/>
        </IconButton>
        <IconButton 
          onClick={props.onNext}
          disabled={props.disableNext}
        >
          <NavigateNextRoundedIcon/>
        </IconButton>
      </Grid>
    </Grid>
	);
}