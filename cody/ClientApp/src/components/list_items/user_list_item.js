import React from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { CustomAvatar } from "src/components/custom_avatar";
import { makeStyles } from '@material-ui/core/styles';
import { ProfilePicture } from "src/lib/server_calls/profile_picture";

const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "100%",
    tableLayout: "fixed",
    padding: theme.spacing(1)
  }
}));

export function UserListItem(props){
	const classes = useStyles();
  const {
    style,
    index,
    data,
    onClick,
    onDataChange,
  } = props

  const handleEvent = (newData) => {
    onDataChange(newData, index)
  }

  return (
    <div style={style} key={index}>
      <ListItem 
        className={classes.listItem}
        ContainerComponent="div" 
        button
        onClick={_ => onClick?.(data)}
      >
        <ListItemAvatar>
          <CustomAvatar
            src={ProfilePicture.url`/${data?.id}`}
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
      </ListItem>
    </div>
  )
}