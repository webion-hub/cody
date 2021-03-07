import React from 'react';

import { Typography, TextField, Grid, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 300,
    [theme.breakpoints.down('xs')]: {
      height: "calc(100vh - 156px)"
    },
  },
  button: {
    textAlign: "end",
    width: "100%"
  },
  createTeamLabel: {
    paddingBottom: theme.spacing(1)
  }
}));


export function CreateTeam(props){
  const classes = useStyles();

  return(
    <>
      <Grid
        className={classes.container}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography
          className={classes.createTeamLabel}
          variant="body1"
        >
          Scegli un nome per il tuo team
        </Typography>
        <TextField
          label="Nome team"
          color="secondary"
          variant="outlined"
        />
      </Grid>
      <div
        className={classes.button}
      >
        <Button
          variant="contained"
          color="primary"
        >
          Conferma
        </Button>
      </div>
    </>
  );
}