import { IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { CustomAvatar } from "src/components/avatars/custom_avatar";
import { makeStyles } from '@material-ui/core/styles';
import { ProfilePicture } from "src/lib/server_calls/profile_picture";
import { PageController } from "src/lib/page_controller";

import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

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

  return (
    <ListItem 
      className={classes.listItem}
      ContainerComponent="div" 
      ContainerProps={{
        style: style,
      }}
      component="a"
      button
      selected={props.selected}
      onClick={props.onClick}
    >
      <ListItemAvatar>
        <CustomAvatar
          src={ProfilePicture.url`/${userId}`}
          alt={data?.username}
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          noWrap: true,
          style: {maxWidth: props.textMaxWidth}
        }}
      >
        {data?.username}
      </ListItemText>
      <ListItemSecondaryAction>
        {secondaryAction}
        <IconButton
          href={`user/${userId}`}
          onClick={e => PageController.push(`user/${userId}`, e)}
        >
          <OpenInNewRoundedIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}