import React from "react";

import { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Checkbox, IconButton } from "@material-ui/core";
import { CustomAvatar } from "src/components/custom_avatar";
import { makeStyles } from '@material-ui/core/styles';
import { ProfilePicture } from "src/lib/server_calls/profile_picture";
import { areEqual } from 'react-window';
import { PageController } from "src/lib/page_controller";

import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';

const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "100%",
    tableLayout: "fixed",
    padding: theme.spacing(1)
  }
}));

export function UserListItem(props) {
  const classes = useStyles();
  const {
    style,
    data,
    secondaryAction
  } = props

  const userId = data?.id

  const secondaryActionComponent = secondaryAction &&
    <ListItemSecondaryAction>
      {secondaryAction}
    </ListItemSecondaryAction>

  return (
    <ListItem 
      className={classes.listItem}
      ContainerComponent="div" 
      ContainerProps={{
        style: style,
      }}
      component="a"
      button
      href={`user/${userId}`}
      onClick={e => PageController.push(`user/${userId}`, e)}
    >
      <ListItemAvatar>
        <CustomAvatar
          src={ProfilePicture.url`/${userId}`}
          alt={data?.username}
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          noWrap: true
        }}
      >
        {data?.username}
      </ListItemText>
      {secondaryActionComponent}
    </ListItem>
  )
}