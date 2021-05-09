import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';
import { useTheme } from '@material-ui/core'

import { ScrollableChipsArray } from 'src/components/scrollable_chips_array';
import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar'

import { languages } from 'src/lib/default_values/lists/coding_languages'

import { useGetSize } from 'src/lib/hooks/use_get_size';
import { SearchBarStartIcon } from './components/search_bar_start_icon';
import { SearchBarEndtIcon } from './components/search_bar_end_icon';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';

const useStyles = makeStyles((theme) => ({
  searchBarBox: {
    maxWidth: 500,
    [theme.breakpoints.down('sm')]: {
      maxWidth: "50vw",
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 500,
    },
    margin: "0 auto"
  },
  chipsBox: {
    opacity: 0,
    zIndex: -1,
    transition: "0.2s all",
  },
  chipsBoxAnimate: {
    transform: "translate(0, 50px)",
    opacity: 1,
    zIndex: -1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

export function SearchBar(props) {
  const classes = useStyles();
	const searchBarRef = useRef();
	const theme = useTheme();
	const searchBarSizes = useGetSize(searchBarRef);
  const searchBarWidth = searchBarSizes.width;

  const [showFavorite, setShowFavorite] = React.useState(false);
  const [languageSelected, setLanguageSelected] = React.useState(null);

  const mobileView = useMobileView()
  const disableTooltipsOnMobile = props.disableTooltipsOnMobile ? mobileView : false;
  const disableTooltip = props.disableTooltips || disableTooltipsOnMobile;

  const handleShowFavorite = () => {
    setShowFavorite(!showFavorite);
  };

  const handleLanguageChange = (value) => {
    setLanguageSelected(value)
  }

  const startIcon = 
    <SearchBarStartIcon
      showFavorite={showFavorite}
      onShowFavoriteChange={handleShowFavorite}
      disableTooltip={disableTooltip}
    />

  const endIcon = 
    <SearchBarEndtIcon
      disableTooltip={disableTooltip}
      onLanguageChange={handleLanguageChange}
      languageValue={languageSelected}
    />

  return (
    <ClickAwayListener 
      mouseEvent="onMouseDown" 
      onClickAway={() => setShowFavorite(false)}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.searchBarBox}
      >
        <GenericSearchBar
          searchBarRef={searchBarRef}
          startIcon={startIcon}
          endIcon={endIcon}
        />        
        <Box 
          position="absolute"          
          width={searchBarWidth}
          className={`${classes.chipsBox} ${showFavorite ? classes.chipsBoxAnimate : ""}`}
        >
          <ScrollableChipsArray
            value={handleLanguageChange}
            list={languages}
            clickables
            delete
            getValue
            color="secondary"
            emptyMessage="Non hai linguaggi preferiti"
          />  
        </Box>
      </Grid>
    </ClickAwayListener>
  );
}