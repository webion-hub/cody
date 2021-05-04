import React from "react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { OrganizationContext } from "../organization_controller_context";
import { AddOrganizationPhotoBase } from "src/components/bases/add_organization_photo_base";
import { CustomImg } from "src/components/custom_img";

const useStyles = makeStyles((theme) => ({
  backgroundImage: props => ({
    height: props.imageHeight,
    width: "100%",
    objectFit: "cover",
    position: "relative",
		display: "block"
  })
}));

export function OrganizationImageBackground(){
  const imageHeight = 240
	const classes = useStyles({imageHeight});
	const { id, callerIs, loading } = React.useContext(OrganizationContext);

  return (
    <AddOrganizationPhotoBase
      aspect={1200 / imageHeight}
      maxSize={1920}
      cropShape="rect"
      id={id}
      callerIs={callerIs}
      type="cover"
      loading={loading}
    >
      <CustomImg 
        className={classes.backgroundImage}
      />
    </AddOrganizationPhotoBase>
  );
}