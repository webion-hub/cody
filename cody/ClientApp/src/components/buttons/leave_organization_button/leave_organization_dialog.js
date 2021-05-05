import React from 'react';
import { Button, Grid, Typography, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

import { DialogBase } from 'src/components/bases/dialog_base';
import { LoadingButton } from 'src/components/buttons/loading_button';

const useStyles = makeStyles((theme) => ({
  dialogLeaveWarning: {
    textAlign: "center"
  },
  dialogLeaveError: {
    textAlign: "center"
  },
  leaveDialog: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  }
}));

export function LeaveOrganizationDialog(props){
  const classes = useStyles();

  const open = props.open;
  const onClose = props.onClose;
  const onLeave = props.onLeave;
  const leaveError = props.leaveError;
  const areError = leaveError !== null && leaveError !== "noError"

  return(
    <DialogBase
      open={open}
      onClose={onClose}
      centeredButtons
      className={classes.leaveDialog}
      firstButton={
        <Button 
          color="secondary"
          onClick={onClose}
        >
          Chiudi
        </Button>
      }
      secondButton={
        <LoadingButton 
          loading={props.loading}
          variant="contained"
          color="primary"
          onClick={onLeave}
          label="Conferma"
        />
      }
      title={`Sei sicuro di volere abbandonare ${props.organizationName}?`}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        <WarningRoundedIcon fontSize="large"/>
        <Typography className={classes.dialogLeaveWarning}>
          Tutti i tuoi progressi veranno eliminati!
        </Typography>
        <Fade
          in={areError}
        >
          <Typography
            color="error"
            variant="caption"
            className={classes.dialogLeaveError}
          >
            {leaveError}
          </Typography>
        </Fade>
      </Grid>
    </DialogBase>
  )
}