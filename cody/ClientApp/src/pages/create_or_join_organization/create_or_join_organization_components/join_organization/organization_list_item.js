import React from 'react';
import { useTheme, ListItemText, ListItem, ListItemIcon, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

import Button from '@material-ui/core/Button';

import { FlowingText } from 'src/components/typography/flowing_text';

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    minWidth: 0,
    paddingRight: 16,
  },
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
    }
  }

  return(
    <ListItem>  
      <ListItemIcon className={classes.listItemIcon}>
        {getIcon(props.kind)}
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <FlowingText
              containerWidth={props.maxListItemWidth}
              background={theme.palette.background.paper}          
            >
              {props.name}      
            </FlowingText>
            <FlowingText
              containerWidth={props.maxListItemWidth}
              background={theme.palette.background.paper}          
            >
              <Typography
                variant="caption"
                component="span"
                color="textSecondary"
              >
                {props.city} {props.country}
              </Typography>       
            </FlowingText>
          </>

        }
      />
      <ListItemSecondaryAction>
        <Button
          variant="outlined"
          color="secondary"
        >
          Unisciti
        </Button>
        <IconButton edge="end" aria-label="delete">
          <OpenInNewRoundedIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}