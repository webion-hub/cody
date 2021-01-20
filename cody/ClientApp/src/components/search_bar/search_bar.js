import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Fade } from '@material-ui/core';

import { CodingFilterDialog } from './coding_filter_dialog';
import { ChipsArray } from './chips_array';

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
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export function SearchBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [languageSelected, setLanguageSelected] = React.useState(null);
  const [showChips, setShowChips] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowChips = () => {
    setShowChips(!showChips);
  };

  const getLanguage = (value) => {
    setLanguageSelected(value)
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Paper component="form" className={classes.root}>
        <Tooltip 
          title={showChips ? "Nascondi i tuoi linguaggi preferiti" : "Mostra i tuoi linguaggi preferiti"} 
          aria-label="filter"
          placement="left"
          arrow
        >
          <IconButton 
            className={classes.iconButton}
            onClick={handleShowChips}
            aria-label="favorite"
          >
            {showChips ? <FavoriteRoundedIcon/> : <FavoriteBorderRoundedIcon />}          
          </IconButton>
        </Tooltip>
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
        top={60}
        width={1}
      >
        <Fade
          in={showChips}
        >
          <div>
            <ChipsArray
              language={getLanguage}
            />
          </div>
        </Fade>        
      </Box>
    </Grid>
  );
}