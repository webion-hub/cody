import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, ButtonGroup } from '@material-ui/core';
import { DialogBase } from 'src/components/bases/others/dialog_base';
import { PageController } from 'src/lib/page_controller';
import { lazyLoader } from '../utilities/lazy_loader';

const LoginBox = lazyLoader(() => import('src/pages/login/components/login_box'))

const useStyles = makeStyles((theme) => ({
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

  const navigateTo = (href) => (event) => {
    PageController.push(href, event)
    props.onClose()
  }

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
          suspenseHeight={225}
          onSuccess={props.onSuccess}
        />
        <ButtonGroup
          className={classes.signUpLink}
          color="secondary"
          variant="outlined"
        >
          <Button
            href='/sign-up'
            onClick={navigateTo('/sign-up')}
          >
            Crea un account
          </Button>
          <Button
            href='/'
            onClick={navigateTo('/')}
          >
            Vai alla home
          </Button>
        </ButtonGroup>
      </Grid>
    </DialogBase>
  )
}