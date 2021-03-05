import React from 'react';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Authentication } from 'src/components/illustrations/authentication';
import { LoginBox } from './login_box';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Images } from 'src/lib/default_values/images';

import history from 'src/history'
import { BasePhotoText } from 'src/components/bases/base_photo_text';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: 632,
    width: "100%",
    marginTop: theme.appBar.fullHeight,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
    },
  },
  createAccount: {
    margin: theme.spacing(1),
    backdropFilter: "blur(10px)",
    background: theme.palette.background.backgroundTransparent,
    color: "rgba(255,255,255,0.9)",
  }
}));

export function Login(){
	const classes = useStyles();

  return (
    <Grid
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${Images.forestImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
      container
      justify="center"
      alignItems="center"
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Paper className={classes.paper}>
          <BasePhotoText
            image={Authentication}
            items={[
              <LoginBox/>
            ]}
          />
        </Paper> 
        <Button
          className={classes.createAccount}
          endIcon={<ArrowForwardIcon/>}
          onClick={() => history.push('/sign-up')}
        >
          Crea un account
        </Button>
      </Grid>
    </Grid>
  );
}
