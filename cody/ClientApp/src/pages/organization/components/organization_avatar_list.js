import React, { useEffect } from "react";
import { ListItem, ListItemAvatar, ListItemText, useTheme } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { CustomAvatar } from "src/components/custom_avatar";
import { ListWithSearch } from "src/components/list_with_search/list_with_search";

export const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "100%",
    tableLayout: "fixed",
  }
}));

export default function OrganizationAvatarList(props){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const appBarHeight = mobileView 
    ? theme.appBar.mobileHeight 
    : theme.appBar.fullHeight

  const userListHeight = window.innerHeight - 192 - appBarHeight

  return (
    <ListWithSearch
      listHeight={userListHeight}
      listMobileHeight={userListHeight}
      width="calc(100% - 8px)"
      elementForStep={25}
      itemSize={56}
      getList={props.organization.getMembersOf}
      listItem={AvatarListItem}
    />
  );
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