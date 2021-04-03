import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CustomAvatar } from 'src/components/custom_avatar';

import { OrganizationListItem } from 'src/components/organization_list_item';
import { TouchableTooltip } from 'src/components/touchable_tooltip';


const useStyles = makeStyles((theme) => ({
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

	return organizationsList.map(organization => 
    <OrganizationListItem 
      className={classes.sideBarAvatar} 
      key={organization.id}
      organizationId={organization.id}
    >
      <TouchableTooltip
        arrow
        placement="right"
        title={organization.name}
      >
        <CustomAvatar
          propsLoading={loading}
          src={`organizations/${organization.id}/logo`}
          alt={organization.name}
        />
      </TouchableTooltip>
    </OrganizationListItem>
  )
}