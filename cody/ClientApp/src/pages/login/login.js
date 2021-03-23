import React from 'react';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Authentication } from 'src/components/illustrations/authentication';
import { LoginBox } from './components/login_box';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Images } from 'src/lib/default_values/images/images';

import { BasePhotoText } from 'src/components/bases/base_photo_text';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';
import { PageController } from 'src/lib/page_controller';
import { PaperWithWaves } from 'src/components/paper_with_waves';

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
  },
  pageContainer: {
    backgroundImage: `url(${Images.forestImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center"
  }
}));

export function Login(){
	const classes = useStyles();

  return (
    <CenterComponentPageBase
      className={classes.pageContainer}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <PaperWithWaves className={classes.paper}>
          <BasePhotoText
            image={Authentication}
            items={[
              <LoginBox/>
            ]}
          />
        </PaperWithWaves> 
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
