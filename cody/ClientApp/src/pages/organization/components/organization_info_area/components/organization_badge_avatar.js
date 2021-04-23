import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Badge } from "@material-ui/core";
import { OrganizationKindIcon } from "src/components/organization_kind_icon";
import { CustomAvatar } from "src/components/custom_avatar";

import { Skeleton } from "@material-ui/lab";
import { AddOrganizationPhotoBase } from "src/components/bases/add_organization_photo_base";

const useStyles = makeStyles((theme) => ({
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
  const { organizationData, id, callerIs } = props

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
      <AddOrganizationPhotoBase
        id={id}
        callerIs={callerIs}
        type="logo"
        loading={props.loading}
      >
        <CustomAvatar       
          alt={organizationData?.name}
          size={110}
          loading={props.loading}
        />
      </AddOrganizationPhotoBase>
    </Badge>
  )
}
