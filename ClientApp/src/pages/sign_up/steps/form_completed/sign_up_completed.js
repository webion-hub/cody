
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { Form } from 'src/lib/default_values/sizes/form_size';
import { RocketLaunch } from 'src/components/illustrations/illustrations/illustrations';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';
import { DialogBase } from 'src/components/bases/others/dialog_base';


const useStyles = makeStyles((theme) => ({
  formCompletedButton: {
    marginTop: theme.spacing(2),
  },
  formCompletedDialog: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(8)}px !important`
    },
  },
}));

export function SignUpCompleted(props){
  const mobileView = useMobileView()
	const classes = useStyles();

  return (
    <DialogBase
      className={classes.formCompletedDialog}
      open={props.open}
      onClose={props.onFormCompleted}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          alignItems="center"
        >
          <RocketLaunch
            boxProps={{
              maxWidth: Form.width
            }}
          />
          <Typography
            variant={mobileView ? "h4" : "h3"}
          >
            Benvenuto
          </ Typography>
          <Typography
            variant={mobileView ? "h5" : "h4"}
          >
            in Cody
          </ Typography>
        </Grid>
        <Button
          className={classes.formCompletedButton}
          variant="contained"
          color="primary"
          onClick={props.onFormCompleted}
        >
          Vai alla home
        </Button>
      </Grid>
    </DialogBase>
  );
}