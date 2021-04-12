import React from "react";
import { DialogBase } from "src/components/bases/dialog_base";
import { ListWithSearch } from "src/components/list_with_search/list_with_search";
import { Button, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { CustomAvatar } from "src/components/custom_avatar";
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "100%",
    tableLayout: "fixed",
  }
}));

export function AllOrganizationUserDialog(props){
  const organization = props.organization
  return (
    <DialogBase
      open={props.open}
      onClose={props.onClose}
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
      <ListWithSearch
        listHeight={500}
        listMobileHeight={500}
        width="calc(100% - 8px)"
        elementForStep={25}
        itemSize={56}
        getList={organization.getMembersOf}
        listItem={AvatarListItem}
        noDataFoundProps={{
          hide: true,
        }}
      />
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
            src={`user/${props.index}/profile_picture`}
            alt={props.data?.username}
            disableLoading
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