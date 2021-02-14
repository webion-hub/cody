import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';

import { CodingFilterDialog } from './coding_filter_dialog';
import { ScrollableChipsArray } from 'src/components/scrollable_chips_array';
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
    maxWidth: 500,
    opacity: 0,
    top: 0,
    zIndex: -1,
    transition: "0.2s all",
    [theme.breakpoints.down('sm')]: {
      maxWidth: "50vw",
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 500,
      transform: "translate(0, 50px)",
      top: "auto",
    },
  },
  chipsBoxAnimate: {
    top: 50,
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
  const [open, setOpen] = React.useState(false);
  const [languageSelected, setLanguageSelected] = React.useState(null);
  const [showFavorite, setShowFavorite] = React.useState(false);

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
        <Paper component="form" className={classes.root}>
          {
            props.showFavoriteAlways ? (
              null
            ):(
              <Tooltip 
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
              </Tooltip>
            )
          }
          <InputBase
            className={classes.input}
            placeholder="Cerca"
            inputProps={{ 'aria-label': 'Cerca' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchRoundedIcon />
          </IconButton>
          <Tooltip 
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
          </Tooltip>
          <CodingFilterDialog
            open={open}
            onClose={handleClose}
            language={getLanguage}
            defaultValue={languageSelected}
          />
        </Paper>
        <Box 
          position="absolute"          
          width={1}
          className={`
            ${classes.chipsBox}
            ${showFavorite || props.showFavoriteAlways ?
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