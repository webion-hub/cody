import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
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

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Cerca"
        inputProps={{ 'aria-label': 'Cerca' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchRoundedIcon />
      </IconButton>
    </Paper>
  );
}