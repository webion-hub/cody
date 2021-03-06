import { ListItemIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import { ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import { CustomAvatar } from 'src/components/avatars/custom_avatar';

import { OrganizationKindIcon } from 'src/components/icons/organization_kind_icon';

import { BookmarkIconButton } from 'src/components/icon_buttons/bookmark_icon_button';
import { OrganizationListItemBase } from 'src/components/bases/items/organization_list_item_base';
import OrganizationImages from 'src/lib/server_calls/organization_images';
import { OrganizationVerifiedLabel } from '../../typography/organization_verified_label';

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

  const organization = props.data
  const organizationId = organization.id
  const organizationName = organization.name
  const organizationHasLogo = organization.hasLogo
  const organizationKind = organization.kind

  const organizationImageUrl = 
    OrganizationImages.of(organizationId).url`/logo`

  return (
    <OrganizationListItemBase
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
        primary={<OrganizationVerifiedLabel organizationData={organization}/>} 
        primaryTypographyProps={{
          noWrap: true,
          className: classes.listItemText
        }}
      />
      <ListItemSecondaryAction>
        <BookmarkIconButton
          organizationData={organization}
        />
      </ListItemSecondaryAction>
    </OrganizationListItemBase>
  )
}