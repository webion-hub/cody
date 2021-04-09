import React from 'react';

import { ListItemIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import { ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import { CustomAvatar } from 'src/components/custom_avatar';

import { OrganizationKindIcon } from 'src/components/organization_kind_icon';
import { OrganizationLabel } from 'src/components/typography/organization_label';

import { BookmarkIconButton } from 'src/components/bookmark_icon_button';
import { OrganizationListItem } from 'src/components/organization_list_item';
import { User } from 'src/lib/server_calls/user';

const useStyles = makeStyles((theme) => ({
  listItemText: {
    maxWidth: 'calc(480px - 140px)',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 210px)',
    },
  },
  listItemIcon: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1)
  },
  listItemAvatar: {
    marginLeft: theme.spacing(1)
  }
}));

export function BookmarkOrganizationListItem(props) {
  const classes = useStyles();
  const [disableBookmarkedIcon, setDisableBookmarkedIcon] = React.useState(false)

  const organization = props.organization
  const organizationId = organization.id
  const organizationName = organization.name
  const organizationHasLogo = organization.hasLogo
  const organizationKind = organization.kind

  const organizationImageUrl = `organizations/${organizationId}/logo`


  const handleBookmarkClick = (isBookmarked) => {
    setDisableBookmarkedIcon(true)
    const userAction = isBookmarked ? 
      User.addBookmarkedOrganization : User.removeBookmarkedOrganization

    userAction(organizationId)
      .finally(_ => setDisableBookmarkedIcon(false))
  }

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
        <BookmarkIconButton
          disabled={disableBookmarkedIcon}
          isBookmarked={props.isBookmarked}
          onClick={handleBookmarkClick}
        />
      </ListItemSecondaryAction>
    </OrganizationListItem>
  )
}