import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'

import { CustomAvatarGroup } from "src/components/custom_avatar_group";
import { UserSmallSummary } from "src/components/user_summaries/user_small_summary";
import { ProfilePicture } from "src/lib/server_calls/profile_picture";
import { useMobileView } from "src/lib/hooks/use_mobile_view";
import { UserListDialog } from "./dialogs/user_list_dialog";

const useStyles = makeStyles((theme) => ({
  avatarGroup: {
    minHeight: 148,
    minWidth: 64,
    padding: theme.spacing(1),
    margin: 0,
    background: theme.palette.background[750],
    [theme.breakpoints.down('xs')]: {
      minHeight: 64,
      width: "100%",
      marginTop: theme.spacing(2),
      "& > *": {
        margin: "0 auto"
      }
    },
  },
}));

export function DynamicAvatarGroup(props) {
	const classes = useStyles();  
  const theme = useTheme();
  const mobileView = useMobileView()
  const [openDialog, setOpenDialog] = React.useState(false)

	const {
    smallUserList,
		loading,
    handler,
    callerIs,
    onUserUpdate
	} = props;

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
    <div className={classes.avatarGroup}>
      <CustomAvatarGroup
        onExtraAvatarClick={_ => setOpenDialog(true)}
        loading={loading}        
        direction={mobileView ? "horizontal" : "vertical"}
        borderColor={theme.palette.background[750]}
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
