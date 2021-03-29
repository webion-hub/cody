import React, { useEffect } from 'react';
import { ListItemText, ListItem, ListItemIcon, ListItemSecondaryAction, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { User } from 'src/lib/user';
import { PageController } from 'src/lib/page_controller';
import { getOrganizationKindIcon } from 'src/lib/get_organization_kind_icon';
import { LeaveOrganizationDialog } from './leave_organization_dialog';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { JoinButton } from './join_button';
import { LeaveButton } from './leave_button';
import { OrganizationLabel } from 'src/components/typography/organization_label';

const useStyles = makeStyles((theme) => ({
  listItem: {
    height: 72,
  },
  listItemIcon: {
    minWidth: 0,
    paddingRight: theme.spacing(2),
  },
  listItemText: {
    maxWidth: 'calc(750px - 226px)',
    [theme.breakpoints.down(750 + theme.drawer.width)]: {
      maxWidth: 'calc(100vw - 275px)'
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 155px)'
    },
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
  verifiedOrganization: {
    transform: "translate(0px, 4px)",
    marginLeft: theme.spacing(1),
    fontSize: 18,
    color: theme.palette.text.secondary
  }
}));

export function JoinOrganizationsListItem(props){
  const data = props.data;
  const id = data.id;
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [membersCount, setMembersCount] = React.useState(data.membersCount);
  const [isCallerAMember, setIsCallerAMember] = React.useState(data.isCallerAMember);
  const [openLeaveDialog, setOpenLeaveDialog] = React.useState(false);
  const [leaveError, setLeaveError] = React.useState(null);

  useEffect(() => {
    setIsCallerAMember(data.isCallerAMember)
  }, [data.isCallerAMember])

  const membersCountLabel = membersCount === 1 ? 
    `${membersCount} Utente` : `${membersCount} Utenti`
  const locationLabel = data.detail.location?
    ` - ${data.detail.location}` : ""

  const openOrganization = (e) => {
    PageController.push(`/organizations/${id}`)
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
    setLoading(true)
    User.leave({
      organizationId: id,      
      onSuccess: () => {
        setMembersCount(membersCount - 1)
        setIsCallerAMember(false)
        handleCloseLeaveDialog();
      },
      onError: () => setLeaveError("C'è stato un errore prova più tardi"),
      onNotFound: () => setLeaveError("Non sei membro di questa organizzazione!"),
      onForbidden: () => setLeaveError("Non puoi uscire da un'organizzazione dove sei il propietario!"),    
    })
    .finally(() => setLoading(false))
  }

  const handleJoin = () => {
    setLoading(true)
    User
      .join(id)
      .finally(() => {
        setLoading(false)
        setIsCallerAMember(true)
        setMembersCount(membersCount + 1)
      })
  }

  const joinButton =
    <JoinButton
      mobileView={props.mobileView}
      loading={loading}
      disabled={data.state.hasBeenDeleted}
      onJoin={handleJoin}
    />

  const leaveButton = 
    <LeaveButton
      mobileView={props.mobileView}
      loading={loading}
      disabled={data.state.hasBeenDeleted}
      onLeave={handleOpenLeaveDialog}    
    />
   
  return(
    <>
      <ListItem 
        ContainerProps={{ style: props.style }}
        ContainerComponent="div" 
        key={props.index}
        className={classes.listItem}
        button
        onClick={openOrganization}
        disabled={data.state.hasBeenDeleted}
      >  
        <ListItemIcon className={classes.listItemIcon}>
          {getOrganizationKindIcon(data.kind)}
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={<OrganizationLabel organization={data}/>}
          secondary={`${membersCountLabel}${locationLabel}`}
          primaryTypographyProps={{
            noWrap: true,
            className: classes.listItemText
          }}
          secondaryTypographyProps={{
            noWrap: true,
            className: classes.listItemText
          }}
        />
        <ListItemSecondaryAction>
          <Grid
            container
            direction="row"
            alignItems="center"
          >         
            {isCallerAMember ? leaveButton : joinButton}
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
      <LeaveOrganizationDialog
        loading={loading}
        open={openLeaveDialog}
        onClose={handleCloseLeaveDialog}
        onLeave={handleLeave}
        organizationName={data.name}
        leaveError={leaveError}
      />
    </>
  )
}