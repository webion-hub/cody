import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Badge } from "@material-ui/core";
import { OrganizationKindIcon } from "src/components/organization_kind_icon";
import { CustomAvatar } from "src/components/custom_avatar";

import { Skeleton } from "@material-ui/lab";

export const useStyles = makeStyles((theme) => ({
  badgeContent: {
    width: 36,
    height: 36,
    padding: 6,
    background: theme.palette.secondary.main,
    borderRadius: 18
  }
}));

export function OrganizationBadgeAvatar(props){
	const classes = useStyles();
  const organizationData = props.organizationData
  const id = props.id

  return (
    <Badge
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      overlap="circle"
      badgeContent={
        <div className={classes.badgeContent}>
          {
            props.loading ?
              <Skeleton 
                variant="circle"
                width={24}
                height={24}
                animation="wave"
              />
              :
              <OrganizationKindIcon kind={organizationData?.kind} size="small"/>
          }
        </div>
      }
    >
      <CustomAvatar
        src={`organizations/${id}/logo`}
        alt={organizationData?.name}
        size={110}
        propsLoading={props.loading}
      />
    </Badge>
  )
}