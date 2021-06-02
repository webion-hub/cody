import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchBarWithPageController } from 'src/components/textfields/search_bars/search_bar_with_page_controller/search_bar_with_page_controller';

const useStyles = makeStyles((theme) => ({
	titleContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
  searchBar: {
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: "calc(100vw - 128px)"
    },
  }
}));

export function DataTableTitleControllers(props){
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
      <SearchBarWithPageController
        searchBarClassName={classes.searchBar}
        onChange={props.onChange}
        onBack={props.onBack}
        disableBack={props.disableBack}
        onNext={props.onNext}
        disableNext={props.disableNext}
      />
    </Grid>
	);
}