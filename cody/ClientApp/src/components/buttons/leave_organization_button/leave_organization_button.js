import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { LoadingButton } from 'src/components/buttons/loading_button';
import { LoadingIconButton } from 'src/components/buttons/loading_icon_button';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { LeaveOrganizationDialog } from './leave_organization_dialog';

import { User } from 'src/lib/server_calls/user';
import { UserOrganizationsController } from 'src/lib/user_organizations_controller';

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

export function LeaveOrganizationButton(props){
  const classes = useStyles();
  const [openLeaveDialog, setOpenLeaveDialog] = React.useState(false);
  const [leaveError, setLeaveError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const {
    organization,
    onLeave,
    mobileView,
    customComponentProps,
    ButtonComponent,
  } = props

  const {
    onClick,
    ...customComponentPropsWithoutOnClick
  } = customComponentProps || {}

  const handleOpenLeaveDialog = () => {
    setOpenLeaveDialog(true)
    setLeaveError(null)
  }

  const handleCloseLeaveDialog = () => {
    setOpenLeaveDialog(false)
  }

  const handleLeave = () => {
    setLeaveError(null)
    setLoading(true)
    User.leave({
      organizationId: organization?.id,      
      onSuccess: _ => setLeaveError("noError"),
      onError: () => setLeaveError("C'è stato un errore prova più tardi"),
      onNotFound: () => setLeaveError("Non sei membro di questa organizzazione!"),
      onForbidden: () => setLeaveError("Non puoi uscire da un'organizzazione dove sei il propietario!"),    
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if(leaveError === "noError"){
      UserOrganizationsController
        .setEvent('updateOrganizationMember')
        .update()

      onLeave?.()
      onClick?.()
      handleCloseLeaveDialog()
    }
  }, [leaveError])

  const commonProps = {
    disabled: organization?.state.hasBeenDeleted,
    className: classes.leaveButton,
    onClick: handleOpenLeaveDialog
  }

  const buttonComponentProps = !customComponentProps &&
    {
      endIcon: <ExitToAppRoundedIcon/>,
      variant: "outlined",
      color: "inherit",
    }

  const leaveOrganizationDialog = 
    <LeaveOrganizationDialog
      loading={loading}
      open={openLeaveDialog}
      onClose={handleCloseLeaveDialog}
      onLeave={handleLeave}
      organizationName={organization?.name}
      leaveError={leaveError}
    />

  if(mobileView)
    return(
      <>
        <LoadingIconButton
          {...commonProps}
          icon={<ExitToAppRoundedIcon/>}
          color="inherit"
        />
        {leaveOrganizationDialog}
      </>
    )

  return (
    <>
      <ButtonComponent
        {...customComponentPropsWithoutOnClick}
        {...commonProps}
        {...buttonComponentProps}
        label="Lascia"
      />
      {leaveOrganizationDialog} 
    </>  
  )
}

LeaveOrganizationButton.defaultProps = {
  ButtonComponent: LoadingButton
}

