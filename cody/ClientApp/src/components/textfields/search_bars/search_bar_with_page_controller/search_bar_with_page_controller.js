import { useTheme } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { GenericSearchBar } from 'src/components/textfields/search_bars/generic_search_bar/generic_search_bar';

import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    marginLeft: theme.spacing(1)
  },
  searchBar: {
    width: "calc(100% - 104px)"
  }
}));

export function SearchBarWithPageController(props){
	const theme = useTheme();
  const classes = useStyles();

	return (
    <Grid 
      className={props.className}
      item
      container
      direction="row"
    >
      <GenericSearchBar
        className={`${props.searchBarClassName} ${classes.searchBar}`}
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
	);
}