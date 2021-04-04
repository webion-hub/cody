import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Fade, Paper } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const useStyles = makeStyles((theme) => ({
  paper: props => ({
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 500,
    width: "100%",
    background: props.background ? 
      props.background : theme.palette.background.paperSecondary
  }),
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  iconDeleteButton: {
    padding: 10,
    color: theme.palette.text.secondary
  }
}));

export function GenericSearchBar(props){
  const background = props.background;
  const classes = useStyles({background});
  const inputBaseRef = useRef();

  const onSubmit = props.onSubmit ? props.onSubmit : () => {}
  const onChange = props.onChange ? props.onChange : () => {}

  const showSearchIcon = props.onSubmit;
  const [showClearIcon, setShowClearIcon] = React.useState(false);

  const handleClear = () => {
    inputBaseRef.current.value = ""
    onChange("")
    onSubmit()
    setShowClearIcon(false)
  }

  const handleChange = (event) => {
    const value = event.target.value;
    onChange(value)
    const isSearchBarNotEmpty = value !== ""
    setShowClearIcon(isSearchBarNotEmpty)
  }

  const handleSubmitWithoutRefresh = (event) => {
    onSubmit()
    //avoid to refresh page
    event.preventDefault()
  }

  const searchIcon = showSearchIcon && 
    <IconButton 
      className={classes.iconButton} 
      aria-label="search"
      onClick={onSubmit}
    >
      <SearchRoundedIcon/>
    </IconButton>

  return (
    <Paper 
      ref={props.searchBarRef}
      component="form"
      onSubmit={handleSubmitWithoutRefresh}
      className={`${classes.paper} ${props.className}`}
    >
      {props.startIcon}
      <InputBase
        inputRef={inputBaseRef}
        className={classes.input}
        placeholder={props.label? props.label : "Cerca"}
        inputProps={{ 'aria-label': 'Cerca' }}
        onChange={handleChange}
        value={props.value}
      />
      <Fade
        in={showClearIcon}
      >
        <IconButton 
          className={classes.iconDeleteButton} 
          aria-label="delete"
          onClick={handleClear}
        >
          <ClearRoundedIcon/>
        </IconButton>
      </Fade>  
      {searchIcon}
      {props.endIcon}
    </Paper>
  )
}