import React from "react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { IconButton, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    fontSize: 28
  },
  addCourseButton: {
    position: "absolute",
    right: 0
  },
}));

export function CoursesButtons(props){
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const {
    onAddCourse,
    onShowSearch,
    showSearchBar,
    callerIs
  } = props
  const canCallerAddCourse = callerIs !== "noMember"

  if(mobileView)
    return <></>;

  return (
    <>
      <IconButton          
        onClick={onShowSearch}
      >
        {
          showSearchBar ? 
            <CloseRoundedIcon className={classes.searchIcon}/>
            :
            <SearchRoundedIcon className={classes.searchIcon}/>
        }          
      </IconButton>
      {
        canCallerAddCourse &&  
          <Tooltip
            className={classes.addCourseButton}
            arrow
            placement="left"
            title="Aggiungi un corso"
          >
            <IconButton
              onClick={onAddCourse}
            >
              <AddRoundedIcon/>
            </IconButton>
          </Tooltip>
      }            
    </>
  )
}