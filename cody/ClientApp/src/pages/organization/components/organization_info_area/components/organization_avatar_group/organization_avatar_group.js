import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import { CustomAvatarGroup } from "src/components/custom_avatar_group";
import { AllOrganizationUserDialog } from "./components/all_organization_user_dialog";
import { UserSmallSummary } from "src/components/user_small_summary";
import { OrganizationContext } from "src/pages/organization/organization_controller_context";
import { ProfilePicture } from "src/lib/server_calls/profile_picture";
import { EventsDispatcher } from "src/lib/events_dispatcher";

const useStyles = makeStyles((theme) => ({
  avatarGroup: {
    minHeight: 148,
    minWidth: 64,
    padding: theme.spacing(1),
    margin: 0,
    background: theme.palette.background.paperSecondary,
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

export function  OrganizationAvatarGroup() {
	const classes = useStyles();  
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const [openDialog, setOpenDialog] = React.useState(false)

	const {
    smallUserList,
		loading,
    organization,
    callerIs
	} = React.useContext(OrganizationContext);

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
          handler={organization}
          onUserUpdate={_ => EventsDispatcher.setEvent('updateOrganizationMember').update()}
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
        borderColor={theme.palette.background.paperSecondary}
        avatarsProps={userList?.userList}
        numberOfAvatar={userList?.totalMember}
      />
      <AllOrganizationUserDialog
        open={openDialog}
        onClose={_ => setOpenDialog(false)}
      />
    </div>
  )
}
