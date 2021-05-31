import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'

import { CustomAvatarGroup } from "src/components/avatars/custom_avatar_group";
import { UserSmallSummary } from "src/components/user_summaries/user_small_summary";
import { ProfilePicture } from "src/lib/server_calls/profile_picture";
import { useMobileView } from "src/lib/hooks/use_mobile_view";
import { UserListDialog } from "../dialogs/user_list_dialog";

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

export function DynamicAvatarGroup(props) {
  const theme = useTheme();
  const mobileView = useMobileView()
  const [openDialog, setOpenDialog] = React.useState(false)

	const {
    smallUserList,
		loading,
    handler,
    callerIs,
    onUserUpdate,
    direction,
    background,
    className,
	} = props;

  const autoDirection = mobileView ? "horizontal" : "vertical"
  const avatarGroupDirection = direction === "auto"
    ? autoDirection
    : direction

  const boxBackground = background 
    ? background 
    : theme.palette.background[750] 

	const classes = useStyles({direction: avatarGroupDirection, boxBackground}); 

  const setUserList = (data) => {
    if(data.length === 0)
      return null

    const values = data.values
    const userList = values.map(user => ({
      src: ProfilePicture.url`/${user.id}`,
      alt: user.username,
      menuContent: 
        <UserSmallSummary 
          user={user}
          callerIs={callerIs}
          handler={handler}
          onUserUpdate={onUserUpdate}
        />
    }))
    
    return {
      userList: userList,
      totalMember: data.total,
    }
  }

  const userList = setUserList(smallUserList)

  return (
    <div className={`${classes.avatarGroup} ${className ?? ""}`}>
      <CustomAvatarGroup
        onExtraAvatarClick={_ => setOpenDialog(true)}
        loading={loading}        
        direction={avatarGroupDirection}
        borderColor={boxBackground}
        avatarsProps={userList?.userList}
        numberOfAvatar={userList?.totalMember}
      />
      <UserListDialog
        open={openDialog}
        onClose={_ => setOpenDialog(false)}
        callerIs={callerIs}
        handler={handler}
        onUserUpdate={onUserUpdate}
      />
    </div>
  )
}


DynamicAvatarGroup.defaultProps = {
  direction: "auto"
}