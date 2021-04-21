import React from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { CustomAvatar } from "src/components/custom_avatar";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "100%",
    tableLayout: "fixed",
    padding: theme.spacing(1)
  }
}));

export function UserListItem(props){
	const classes = useStyles();

  return (
    <div style={props.style} key={props.index}>
      <ListItem 
        className={classes.listItem}
        ContainerComponent="div" 
        button
        onClick={_ => props.onClick?.(props.data)}
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