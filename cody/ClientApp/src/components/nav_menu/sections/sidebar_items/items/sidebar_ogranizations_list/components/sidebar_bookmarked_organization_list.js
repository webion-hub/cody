import makeStyles from '@material-ui/core/styles/makeStyles';
import { CustomAvatar } from 'src/components/custom_avatar';

import { OrganizationListItemBase } from 'src/components/list_items/organization_list_item_base';
import { OrganizationKindIcon } from 'src/components/organization_kind_icon';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import OrganizationImages from 'src/lib/server_calls/organization_images';


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
      <OrganizationListItemBase 
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
            loading={loading}
            src={OrganizationImages.of(organization.id).url`/logo`}
            alt={organization.name}
          />
        </Tooltip>
      </OrganizationListItemBase>
    )
}