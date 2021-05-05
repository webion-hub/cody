import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip } from '@material-ui/core';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 10,
  },
}));

export function SearchBarStartIcon(props) {
  const classes = useStyles();
  const showFavorite = props.showFavorite;
  const onShowFavoriteChange = props.onShowFavoriteChange
  const disableTooltip = props.disableTooltip

  return (
    <Tooltip 
      title={
        showFavorite ? 
          "Nascondi i tuoi linguaggi preferiti" : "Mostra i tuoi linguaggi preferiti"
      } 
      aria-label="filter"
      placement="left"
      disabled={disableTooltip}
      arrow
    >
      <IconButton 
        className={classes.iconButton}
        onClick={onShowFavoriteChange}
        aria-label="favorite"
      >
        {
          showFavorite ? 
            <FavoriteRoundedIcon/> : <FavoriteBorderRoundedIcon/>
        }          
      </IconButton>
    </Tooltip>
  );
}