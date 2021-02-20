import React, { useLayoutEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Link, Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';

import { CodingFilterDialog } from 'src/components/pickers/search_bar/coding_filter_dialog';
import { ScrollableChipsArray } from 'src/components/scrollable_chips_array';
import { TouchableTooltip } from 'src/components/touchable_tooltip'

import { languages } from 'src/lib/default_values/lists/coding_languages'

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 500,
    width: "100%",
    background: theme.palette.background.paperDark
  },
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
    [theme.breakpoints.down('xs')]: {
      transform: "translate(0, 50px)",
      top: "auto",
    },
  },
  chipsBoxAnimate: {
    transform: "translate(0, 50px)",
    opacity: 1,
    zIndex: -1,
    [theme.breakpoints.down('xs')]: {
      top: "auto",
      zIndex: "auto"
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export function SearchBar(props) {
  const classes = useStyles();
	const searchBarRef = useRef();

  const [open, setOpen] = React.useState(false);
  const [languageSelected, setLanguageSelected] = React.useState(null);
  const [showFavorite, setShowFavorite] = React.useState(false);
  const [searchBarWidth, setSearchBarWidth] = React.useState(0);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateWidth);
		
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, [searchBarRef.current]);

  const updateWidth = () => {
    if(searchBarRef.current !== undefined)
      setSearchBarWidth(searchBarRef.current.offsetWidth)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowFavorite = () => {
    setShowFavorite(!showFavorite);
  };

  const getLanguage = (value) => {
    setLanguageSelected(value)
  };

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={() => setShowFavorite(false)}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.searchBarBox}
      >
        <Paper 
          ref={searchBarRef}
          component="form"
          className={classes.root}
        >
          {
            <TouchableTooltip 
              title={showFavorite ? "Nascondi i tuoi linguaggi preferiti" : "Mostra i tuoi linguaggi preferiti"} 
              aria-label="filter"
              placement="left"
              arrow
            >
              <IconButton 
                className={classes.iconButton}
                onClick={handleShowFavorite}
                aria-label="favorite"
              >
                {showFavorite ? <FavoriteRoundedIcon/> : <FavoriteBorderRoundedIcon />}          
              </IconButton>
            </TouchableTooltip>
          }
          <InputBase
            className={classes.input}
            placeholder="Cerca"
            inputProps={{ 'aria-label': 'Cerca' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchRoundedIcon />
          </IconButton>
          <TouchableTooltip 
            title="Seleziona il linguaggio di programmazione." 
            aria-label="filter"
            placement="right"
            arrow
          >
            <IconButton 
              className={classes.iconButton} 
              aria-label="filter"
              onClick={handleClickOpen}
            >
              {languageSelected? languageSelected.icon : <CodeRoundedIcon/>}
            </IconButton>
          </TouchableTooltip>
          <CodingFilterDialog
            open={open}
            onClose={handleClose}
            language={getLanguage}
            defaultValue={languageSelected}
          />
        </Paper>
        <Box 
          position="absolute"          
          width={searchBarWidth}
          className={`
            ${classes.chipsBox}
            ${showFavorite ?
               classes.chipsBoxAnimate 
               : null
              }
          `}
        >
          <ScrollableChipsArray
            value={getLanguage}
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