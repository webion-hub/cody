import React from 'react';
import { useTheme, ListItemText, ListItem, ListItemIcon, ListItemSecondaryAction, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { FlowingText } from 'src/components/typography/flowing_text';

import { User } from 'src/lib/user';
import { LoadingButton } from 'src/components/buttons/loading_button';
import { PageController } from 'src/lib/page_controller';
import { getOrganizationKindIcon } from 'src/lib/get_organization_kind_icon';
import { LeaveOrganizationDialog } from './leave_organization_dialog';

const useStyles = makeStyles((theme) => ({
  listItem: {
    height: 72,
  },
  listItemIcon: {
    minWidth: 0,
    paddingRight: theme.spacing(2),
  },
  members: {
    marginRight: theme.spacing(2),
  },
  leaveButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    "&:hover": {
      color: theme.palette.error.light,
      borderColor: theme.palette.error.light,
    }
  },
}));

export function JoinOrganizationsListItem(props){
  const data = props.data;
  const id = data.id;

	const theme = useTheme();
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [membersCount, setMembersCount] = React.useState(data.membersCount);
  const [showLeaveButton, setShowLeaveButton] = React.useState(data.isCallerAMember);
  const [openLeaveDialog, setOpenLeaveDialog] = React.useState(false);
  const [leaveError, setLeaveError] = React.useState(null);

  const membersCountLabel = membersCount === 1 ? 
    `${membersCount} Utente` : `${membersCount} Utenti`
  const locationLabel = data.detail.location?
    ` - ${data.detail.location}` : ""

  const openOrganization = (e) => {
    PageController.push(`/organizations/${id}`)
  }

  const handleJoin = () => {
    setLoading(true)
    User
      .join(id)
      .then((val) => {
        setLoading(false)
        setShowLeaveButton(true)
        setMembersCount(membersCount + 1)
      })
  }

  const handleOpenLeaveDialog = () => {
    setOpenLeaveDialog(true)
    setLeaveError(null)
  }

  const handleCloseLeaveDialog = () => {
    setOpenLeaveDialog(false)
  }

  const handleLeave = () => {
    setLeaveError(null)
    User.leave({
      organizationId: id,      
      onSuccess: () => {
        setMembersCount(membersCount - 1)
        setShowLeaveButton(false)
        handleCloseLeaveDialog();
      },
      onError: () => setLeaveError("C'è stato un errore prova più tardi"),
      onNotFound: () => setLeaveError("Non sei membro di questa organizzazione!"),
      onForbidden: () => setLeaveError("Non puoi uscire da un'organizzazione dove sei il propietario!"),    
    })
  }

  const joinButton =
    <LoadingButton
      loading={loading}
      variant="outlined"
      color="secondary"
      disabled={data.state.hasBeenDeleted}
      onClick={handleJoin}
      label="Unisciti"
    />

  const leaveButton = 
    <LoadingButton
      loading={loading}
      variant="outlined"
      disabled={data.state.hasBeenDeleted}
      onClick={handleOpenLeaveDialog}
      label="Lascia"
      className={classes.leaveButton}
    />
 
  return(
    <>
      <ListItem 
        className={classes.listItem}
        button
        onClick={openOrganization}
        disabled={data.state.hasBeenDeleted}
      >  
        <ListItemIcon className={classes.listItemIcon}>
          {getOrganizationKindIcon(data.kind)}
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              <FlowingText
                containerWidth={props.maxListItemWidth}
                background={theme.palette.background.paperSecondary}          
              >
                {data.name}      
              </FlowingText>
              <FlowingText
                variant="caption"
                color="textSecondary"
                containerWidth={props.maxListItemWidth}
                background={theme.palette.background.paperSecondary}          
              >
                {membersCountLabel}{locationLabel}    
              </FlowingText>
            </>
          }
        />
        <ListItemSecondaryAction>
          <Grid
            container
            direction="row"
            alignItems="center"
          >         
            {
              showLeaveButton ? 
                leaveButton
                :
                joinButton
            }
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
      <LeaveOrganizationDialog
        open={openLeaveDialog}
        onClose={handleCloseLeaveDialog}
        onLeave={handleLeave}
        organizationName={data.name}
        leaveError={leaveError}
      />
    </>
  )
}