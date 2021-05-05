import React from 'react';
import { PageController } from 'src/lib/page_controller';

import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EcoRoundedIcon from '@material-ui/icons/EcoRounded';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    right: 16,
    bottom: 16,
    zIndex: 1000,
  },
  icon: {
    marginRight: 8
  }
}));

export function MainFab(){
	const classes = useStyles();

  return (
    <Fab 
      className={classes.fab}
      variant="extended"
      color="primary"
      href="/help-us"
      onClick={e => PageController.push("/help-us", e)}
    >
      <EcoRoundedIcon className={classes.icon}/>
      Aiutaci
    </Fab>
  )
}