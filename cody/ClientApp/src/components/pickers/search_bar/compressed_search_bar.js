import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { IconButton } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';
import { Backdrop } from '@material-ui/core';

import { SearchBar } from './search_bar';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';


const useStyles = makeStyles((theme) => ({
  menu:{
    background: "transparent",
    boxShadow: "none",
    overflow: "hidden"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  searchBar: {
    margin: "0 auto",
    marginTop: 20,
    top: 0,
    position: "absolute",
    width: "90%",
  }
}));

export function CompressedSearchBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  return (
    <div>
      <IconButton
        aria-haspopup="true"
        onClick={() => setOpen(true)}
      >
        <SearchRoundedIcon/>
      </IconButton>
      <Backdrop 
        className={classes.backdrop} 
        open={open} 
      >
        {
          open ? 
            <ClickAwayListener 
              onClickAway={() => setOpen(false)}
            >
              <div className={classes.searchBar}>
                <SearchBar
                  disableTooltips
                  showFavoriteLinkButton
                />
              </div>
            </ClickAwayListener>
          : null          
        }
      </Backdrop>
    </div>

  );
}