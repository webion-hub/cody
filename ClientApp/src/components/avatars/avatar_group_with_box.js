import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'

import { CustomAvatarGroup } from "src/components/avatars/custom_avatar_group/custom_avatar_group";
import { UserSmallSummary } from "src/components/user_summaries/user_small_summary";
import { ProfilePicture } from "src/lib/server_calls/profile_picture";
import { useMobileView } from "src/lib/hooks/use_mobile_view";
import { UserListDialog } from "../dialogs/user_list_dialog";
import { PageController } from "src/lib/page_controller";

const useStyles = makeStyles((theme) => ({
  avatarGroup: props => ({
    minHeight: props.direction === "vertical" ? 148 : "auto",
    minWidth: 64,
    padding: theme.spacing(1),
    margin: 0,
    background: props.boxBackground,
    [theme.breakpoints.down('xs')]: {
      minHeight: 64,
      width: "100%",
      marginTop: theme.spacing(2),
      "& > *": {
        margin: "0 auto"
      }
    },
  }),
}));

export function AvatarGroupWithBox(props) {
  const theme = useTheme();
  const mobileView = useMobileView()

  const {
    onUserUpdate,
    direction,
    background,
    className,
    ...other
	} = props;

  const autoDirection = mobileView ? "horizontal" : "vertical"
  const avatarGroupDirection = direction === "auto"
    ? autoDirection
    : direction

  const boxBackground = background 
    ? background 
    : theme.palette.background[750] 

	const classes = useStyles({direction: avatarGroupDirection, boxBackground}); 

  return (
    <div className={`${classes.avatarGroup} ${className ?? ""}`}>
      <CustomAvatarGroup
        {...other}
        direction={avatarGroupDirection}
        borderColor={boxBackground}
      />
    </div>
  )
}

AvatarGroupWithBox.defaultProps = {
  direction: "auto"
}