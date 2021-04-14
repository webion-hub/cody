import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CustomAvatar } from 'src/components/custom_avatar';

import { OrganizationListItem } from 'src/components/organization_list_item';
import { OrganizationKindIcon } from 'src/components/organization_kind_icon';
import { Grid, Tooltip, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  tootltipTitle: {
    paddingLeft: theme.spacing(1)
  },
	sideBarAvatar: {
		padding: 4,
		animation: `$fade 0.25s linear`,
	},
	"@keyframes fade": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  },
}));

export function SidebarOrganizationAvatarList(props){
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

	return organizationsList.map(organization => 
    <OrganizationListItem 
      className={classes.sideBarAvatar} 
      key={organization.id}
      organizationId={organization.id}
    >
      <Tooltip
        key={organization.id}
        arrow
        placement="right"
        title={getTooltipTitle(organization)}
      >
        <CustomAvatar
          propsLoading={loading}
          src={`organizations/${organization.id}/logo`}
          alt={organization.name}
        />
      </Tooltip>
    </OrganizationListItem>
  )
}