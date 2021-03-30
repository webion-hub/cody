import React from 'react';

import { ListItemIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import { ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import { CustomAvatar } from 'src/components/custom_avatar';

import { OrganizationKindIcon } from 'src/components/organization_kind_icon';
import { OrganizationLabel } from 'src/components/typography/organization_label';

import { FavoriteIconButton } from 'src/components/favorite_icon_button';
import { OrganizationListItem } from 'src/components/organization_list_item';

const useStyles = makeStyles((theme) => ({
  listItemText: {
    maxWidth: 'calc(480px - 140px)',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 190px)',
    },
  },
  listItemIcon: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1)
  },
  listItemAvatar: {
    marginLeft: theme.spacing(2)
  }
}));

export function FavoriteOrganizationListItem(props) {
  const classes = useStyles();

  const organization = props.organization
  const organizationId = organization.id
  const organizationName = organization.name
  const organizationHasLogo = organization.hasLogo
  const organizationKind = organization.kind

  const organizationImageUrl = `organizations/${organizationId}/logo`

  return (
    <OrganizationListItem
      index={props.index}
      organizationId={organizationId}
      style={props.style}
    >
      {
        organizationHasLogo ? 
          <ListItemAvatar className={classes.listItemAvatar}>
            <CustomAvatar
              src={organizationImageUrl}
              alt={organizationName}
            />
          </ListItemAvatar>
          :
          <ListItemIcon className={classes.listItemIcon}>
            <OrganizationKindIcon
              kind={organizationKind}
            />
          </ListItemIcon>
      }
      <ListItemText
        className={classes.listItemText}
        primary={<OrganizationLabel organization={organization}/>} 
        primaryTypographyProps={{
          noWrap: true,
          className: classes.listItemText
        }}
      />
      <ListItemSecondaryAction>
        <FavoriteIconButton
          isFavorite={props.isFavorite}
          onChange={props.onIsFavoriteChange}
        />
      </ListItemSecondaryAction>
    </OrganizationListItem>
  )
}