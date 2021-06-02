import { makeStyles } from '@material-ui/core/styles';
import { CustomAvatar } from 'src/components/avatars/custom_avatar';

import { OrganizationListItemBase } from 'src/components/bases/items/organization_list_item_base';
import { OrganizationKindIcon } from 'src/components/icons/organization_kind_icon';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import OrganizationImages from 'src/lib/server_calls/organization_images';
import { CustomFade } from 'src/components/utilities/custom_fade';


const useStyles = makeStyles((theme) => ({
  tootltipTitle: {
    paddingLeft: theme.spacing(1)
  },
	sideBarAvatar: {
		padding: 4,
	},
}));

export function SidebarBookmarkedOrganizationList(props){
  const classes = useStyles();
  const organizationsList = props.organizationsList
  const loading = props.loading


  const getTooltipTitle = (organization) => {
    return (
      <Grid 
        container 
        direction="row" 
        justify="center" 
        alignItems="center"
      >
        <OrganizationKindIcon kind={organization.kind} size="small"/>
        <Typography 
          variant="caption"
          className={classes.tootltipTitle}
        >
          {organization.name}
        </Typography>
      </Grid>
    )
  }

	return organizationsList
    .map(organization => 
      <CustomFade key={organization.id}>
        <OrganizationListItemBase 
          className={classes.sideBarAvatar}          
          organizationId={organization.id}
        >
          <Tooltip
            key={organization.id}
            arrow
            placement="right"
            title={getTooltipTitle(organization)}
          >
            <CustomAvatar
              loading={loading}
              src={OrganizationImages.of(organization.id).url`/logo`}
              alt={organization.name}
            />
          </Tooltip>
        </OrganizationListItemBase>
      </CustomFade>
    )
}