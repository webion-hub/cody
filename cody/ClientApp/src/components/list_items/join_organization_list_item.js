import React, { useEffect } from 'react';
import { ListItemText, ListItemIcon, ListItemSecondaryAction, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { OrganizationKindIcon } from 'src/components/organization_kind_icon';

import { JoinOrganizationButton } from '../buttons/join_organization_button';
import { LeaveOrganizationButton } from '../buttons/leave_organization_button/leave_organization_button';
import { OrganizationListItemBase } from 'src/components/list_items/organization_list_item_base';
import { OrganizationVerifiedLabel } from '../typography/organization_verified_label';

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

  const [membersCount, setMembersCount] = React.useState(data.membersCount);
  const [isCallerAMember, setIsCallerAMember] = React.useState(data.isCallerAMember);

  useEffect(() => {
    setIsCallerAMember(data.isCallerAMember)
  }, [data.isCallerAMember])

  const membersCountLabel = membersCount === 1 
    ? `${membersCount} Utente`
    : `${membersCount} Utenti`

  const locationLabel = data.detail.location
    ? ` - ${data.detail.location}` 
    : ""

  const handleLeave = () => {
    setIsCallerAMember(false)
    setMembersCount(membersCount - 1)
  }

  const handleJoin = () => {
    setIsCallerAMember(true)
    setMembersCount(membersCount + 1)
  }

  const joinButton =
    <JoinOrganizationButton
      organization={data}
      mobileView={props.mobileView}
      onJoin={handleJoin}
    />

  const leaveButton = 
    <LeaveOrganizationButton
      organization={data}
      mobileView={props.mobileView}
      onLeave={handleLeave}    
    />
   
  return(
    <OrganizationListItemBase
      index={props.index}
      className={classes.listItem}
      disabled={data.state.hasBeenDeleted}
      organizationId={id}
      style={props.style}
    >
      <ListItemIcon className={classes.listItemIcon}>
        <OrganizationKindIcon kind={data.kind}/>
      </ListItemIcon>
      <ListItemText
        className={classes.listItemText}
        primary={<OrganizationVerifiedLabel organizationData={data}/>}
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
    </OrganizationListItemBase>
  )
}