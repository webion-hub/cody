import React from 'react';

import { Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { Sad } from 'src/components/illustrations/sad';


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

export function NoDataFound(props) {
  const classes = useStyles();
  
  if(props.loading || props.hide)
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
        {props.title}
      </Typography>
      <Typography variant="subtitle1">
        {props.subTitle}
      </Typography>
      {
        props.buttonLabel && 
          <Button
            className={classes.findOrganizationButton}
            variant="outlined"
            color="secondary"
            href={props.buttonHref}
            onClick={props.buttonOnClick}
          >
            {props.buttonLabel}
          </Button>
      }
    </Grid>
  )
}

NoDataFound.defaultProps = {
  title: "Nessun risultato",
  subTitle: "Non è stato trovato nussun risultato",
}