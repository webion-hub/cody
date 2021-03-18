import React from 'react';
import { useTheme, ListItemText, ListItem, ListItemIcon, ListItemSecondaryAction, IconButton, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

import Button from '@material-ui/core/Button';

import { FlowingText } from 'src/components/typography/flowing_text';

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
  }
}));

export function OrganizationsListItem(props){
	const theme = useTheme();
  const classes = useStyles();

  const getIcon = (kind) => {
    switch(kind){
      case "School":        
        return <SchoolRoundedIcon/>;
      case "Team":        
        return <GroupRoundedIcon/>;
      case "Company":        
        return <BusinessCenterRoundedIcon/>;
      default:
        return;
    }
  }

  const membersCountLabel = props.data.membersCount === 1 ? 
    `${props.data.membersCount} Utente` : `${props.data.membersCount} Utenti`
  const locationLabel = props.data.detail.location?
    ` - ${props.data.detail.location}` : ""

  return(
    <ListItem className={classes.listItem}>  
      <ListItemIcon className={classes.listItemIcon}>
        {getIcon(props.data.kind)}
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <FlowingText
              containerWidth={props.maxListItemWidth}
              background={theme.palette.background.paperSecondary}          
            >
              {props.data.name}      
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
         
          <Button
            variant="outlined"
            color="secondary"
            disabled={props.data.state.hasBeenDeleted}
          >
            Unisciti
          </Button>
          <IconButton 
            edge="end" 
            aria-label="delete"
            disabled={props.data.state.hasBeenDeleted}
          >
            <OpenInNewRoundedIcon/>
          </IconButton>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
  )
}