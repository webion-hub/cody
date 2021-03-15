import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Fade, Paper } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 500,
    width: "100%",
    background: theme.palette.background.paperSecondary
  },
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
  const classes = useStyles();
  const inputBaseRef = useRef();
  const [showDelete, setShowDelete] = React.useState(false);
  const onSubmit = props.onSubmit ? props.onSubmit : () => {}
  const onChange = props.onChange ? props.onChange : () => {}

  const handleDelete = () => {
    inputBaseRef.current.value = ""
    onChange("")
    onSubmit()
    setShowDelete(false)
  }

  return (
    <Paper 
      ref={props.searchBarRef}
      component="form"
      onSubmit={(event) => {
        onSubmit()
        event.preventDefault()
      }}
      className={`${classes.root} ${props.className}`}
      style={{
        background: props.background
      }}
    >
      {props.startIcon}
      <InputBase
        inputRef={inputBaseRef}
        className={classes.input}
        placeholder={props.label? props.label : "Cerca"}
        inputProps={{ 'aria-label': 'Cerca' }}
        onChange={(event) => {
          const value = event.target.value;
          onChange(value)
          const showDelete = value !== ""
          setShowDelete(showDelete)
        }}
        onSubmit={e => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation()
        }}
      />
      <Fade
        in={showDelete}
      >
        <IconButton 
          className={classes.iconDeleteButton} 
          aria-label="delete"
          onClick={handleDelete}
        >
          <ClearRoundedIcon/>
        </IconButton>
      </Fade>  
      {
        props.onSubmit ? 
          <IconButton 
            className={classes.iconButton} 
            aria-label="search"
            onClick={onSubmit}
          >
            <SearchRoundedIcon/>
          </IconButton>
          :
          null
      }
      {props.endIcon}
    </Paper>
  )
}