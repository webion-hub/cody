import React from 'react';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Authentication } from 'src/components/illustrations/authentication';
import { LoginBox } from './login_box';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Images } from 'src/lib/default_values/images';

import { BasePhotoText } from 'src/components/bases/base_photo_text';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';
import { PageController } from 'src/lib/page_controller';

export const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.paperSecondary,
    backgroundImage: theme.palette.type === "dark" ? "url(images/waves/wavesDark.svg)" : "url(images/waves/wavesLight.svg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
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
  },
  pageBackground: {
    backgroundImage: `url(${Images.forestImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center"
  }
}));

export function Login(){
	const classes = useStyles();

  return (
    <CenterComponentPageBase
      className={classes.pageBackground}
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
          href='/sign-up'
          onClick={(e) => PageController.push('/sign-up', e)}
        >
          Crea un account
        </Button>
      </Grid>
    </CenterComponentPageBase>
  );
}
