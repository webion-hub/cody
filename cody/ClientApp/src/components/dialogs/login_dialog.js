import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, ButtonGroup } from '@material-ui/core';
import { DialogBase } from 'src/components/bases/dialog_base';
import { LoginBox } from 'src/pages/login/components/login_box';
import { PageController } from 'src/lib/page_controller';

export const useStyles = makeStyles((theme) => ({
  paperClassName: {
    maxWidth: 632,
    width: "100%"
  },
  signUpLink: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
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
        <ButtonGroup
          className={classes.signUpLink}
          color="secondary"
          variant="outlined"
        >
          <Button
            href='/sign-up'
            onClick={(event) => PageController.push('/sign-up', event)}
          >
            Crea un account
          </Button>
          <Button
            href='/'
            onClick={(event) => PageController.push('/', event)}
          >
            Vai alla home
          </Button>
        </ButtonGroup>
      </Grid>
    </DialogBase>
  )
}