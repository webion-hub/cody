import React from 'react';

import { Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { Sad } from 'src/components/illustrations/sad';

import { PageController } from 'src/lib/page_controller';


const useStyles = makeStyles((theme) => ({
  findOrganizationButton: {
    marginTop: theme.spacing(3)
  },
  findOrganizationContainer: {
    height: `calc(100vh - ${theme.appBar.fullHeight + 16}px)`,
    [theme.breakpoints.down('xs')]: {
      height: `calc(100vh - ${theme.appBar.mobileHeight + 16}px)`,
    },  
  }
}));

export function NoOrganizationFounded(props) {
  const classes = useStyles();
  
  if(props.loading)
    return null;

  return (
    <Grid
      className={classes.findOrganizationContainer}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Sad size="100%"/>
      <Typography variant="h6">
        Nessun risultato
      </Typography>
      <Typography variant="subtitle1">
        Non è stata trovata nessuna organizzazione.
      </Typography>
      <Button
        className={classes.findOrganizationButton}
        variant="outlined"
        color="secondary"
        href='/organization'
        onClick={(event) => PageController.push('/organization', event)}
      >
        Trova un'organizzazione
      </Button>
    </Grid>
  )
}