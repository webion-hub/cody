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
    maxWidth: 500,
    width: "100%",
    background: theme.palette.background.paperDark
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export function GenericSearchBar(props){
  const classes = useStyles();

  return (
    <Paper 
      ref={props.searchBarRef}
      component="form"
      className={classes.root}
      style={{
        background: props.background
      }}
    >
      {props.startIcon}
      <InputBase
        className={classes.input}
        placeholder={props.label? props.label : "Cerca"}
        inputProps={{ 'aria-label': 'Cerca' }}
        onChange={props.onChange}
      />
      <IconButton 
        className={classes.iconButton} 
        aria-label="search"
        onClick={props.onSubmit}
      >
        <SearchRoundedIcon />
      </IconButton>
      {props.endIcon}
    </Paper>
  )
}