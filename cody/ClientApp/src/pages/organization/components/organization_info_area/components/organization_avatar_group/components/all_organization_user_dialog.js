import React from "react";
import { DialogBase } from "src/components/bases/dialog_base";
import { ListWithSearch } from "src/components/list_with_search/list_with_search";
import { Button, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { CustomAvatar } from "src/components/custom_avatar";
import { makeStyles } from '@material-ui/core/styles';
import { BasePhotoText } from "src/components/bases/base_photo_text";
import { UserGroup } from "src/components/illustrations/user_group";
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { OrganizationContext } from "src/pages/organization/organization_controller_context";

export const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "100%",
    tableLayout: "fixed",
    padding: theme.spacing(1)
  },
  dialogPaper: {
    maxWidth: 632,
    width: "100%"
  },
  userList: {
    background: theme.palette.background.backgroundTransparent,
    backdropFilter: "blur(10px)"
  }
}));

export function AllOrganizationUserDialog(props){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
	const classes = useStyles();
	const {
    organization,
	} = React.useContext(OrganizationContext);

  return (
    <DialogBase
      open={props.open}
      onClose={props.onClose}
      paperClassName={classes.dialogPaper}
      firstButton={
        <Button
          color="primary"
          variant="contained"
          onClick={props.onClose}
        >
          Chiudi
        </Button>
      }
    >
      <BasePhotoText
        imagePadding={4}
        image={!mobileView && UserGroup}
      >
        <ListWithSearch
          paperClassName={classes.userList}
          listHeight={400}
          listMobileHeight={window.innerHeight / 2}
          width="100%"
          elementForStep={25}
          itemSize={56}
          getList={organization.getMembersOf}
          listItem={AvatarListItem}
          noDataFoundProps={{
            hide: true,
          }}
        />     
      </BasePhotoText>

    </DialogBase> 
  )
}

function AvatarListItem(props){
	const classes = useStyles();

  return (
    <div style={props.style} key={props.index}>
      <ListItem 
        className={classes.listItem}
        ContainerComponent="div" 
        button
      >
        <ListItemAvatar>
          <CustomAvatar
            src={`user/profile_picture/${props.data?.id}`}
            alt={props.data?.username}
          />
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{
            noWrap: true
          }}
        >
          {props.data?.username}
        </ListItemText>
      </ListItem>
    </div>
  )
}