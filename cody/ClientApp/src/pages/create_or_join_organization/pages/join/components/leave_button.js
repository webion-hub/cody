import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { LoadingButton } from 'src/components/buttons/loading_button';
import { LoadingIconButton } from 'src/components/buttons/loading_icon_button';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const useStyles = makeStyles((theme) => ({
  leaveButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    "&:hover": {
      color: theme.palette.error.light,
      borderColor: theme.palette.error.light,
    }
  },
}));

export function LeaveButton(props){
  const classes = useStyles();

  const loading = props.loading;
  const disabled = props.disabled;
  const onLeave = props.onLeave;

  if(props.mobileView)
    return(
      <LoadingIconButton
        loading={loading}  
        color="inherit"
        disabled={disabled}
        className={classes.leaveButton}
        onClick={onLeave}
        icon={<ExitToAppRoundedIcon/>}
      />
    )
  else
    return (
      <LoadingButton
        loading={loading}
        variant="outlined"
        color="inherit"
        disabled={disabled}
        onClick={onLeave}
        label="Lascia"
        className={classes.leaveButton}
        endIcon={<ExitToAppRoundedIcon/>}
      />    
    )
}