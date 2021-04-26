import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import { Grid, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mobileButton: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export function MobileCoursesButtons(props){
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
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        {
          canCallerAddCourse && mobileView &&
            <Button
              className={classes.mobileButton}
              variant="contained"
              color="primary"
              onClick={onAddCourse}
            >
              Aggiungi Corso
            </Button>
        }
        <Button
          className={classes.mobileButton}
          variant="outlined"
          color="secondary"
          onClick={onShowSearch}
        >
          {showSearchBar ? "Chiudi" : "Cerca"}
        </Button>
      </Grid>
    )

  return <></>;
}