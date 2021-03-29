import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { DialogBase } from 'src/components/bases/dialog_base';
import { LoginBox } from 'src/pages/login/components/login_box';
import { PageController } from 'src/lib/page_controller';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export const useStyles = makeStyles((theme) => ({
  paperClassName: {
    maxWidth: 632,
    width: "100%"
  },
  signUpLink: {
    marginTop: theme.spacing(2)
  }
}));

export function LoginDialog(props){
	const classes = useStyles();

  return (
    <DialogBase
      open={props.open}
      onClose={props.onClose}
      paperClassName={classes.paperClassName}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <LoginBox
          onSuccess={props.onSuccess}
        />
        <Button
          className={classes.signUpLink}
          endIcon={<ArrowForwardIcon/>}
          href='/sign-up'
          color="secondary"
          onClick={(event) => PageController.push('/sign-up', event)}
        >
          Crea un account
        </Button>
      </Grid>
    </DialogBase>
  )
}