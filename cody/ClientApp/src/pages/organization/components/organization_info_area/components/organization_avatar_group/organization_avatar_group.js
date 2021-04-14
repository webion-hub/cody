import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import { CustomAvatarGroup } from "src/components/custom_avatar_group";
import Organization from "src/lib/server_calls/organization";
import { PageController } from "src/lib/page_controller";
import { AllOrganizationUserDialog } from "./components/all_organization_user_dialog";

export const useStyles = makeStyles((theme) => ({
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
  }
}));

export function  OrganizationAvatarGroup(props) {
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
	const classes = useStyles();
	const organization = props.organization
  const [openDialog, setOpenDialog] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [smallUserList, setSmallUserList] = React.useState([])
  
	useEffect(() => {
		document.addEventListener('updateUserOrganizations', getMembers)
    getMembers()

		return _ => document.removeEventListener('updateUserOrganizations', getMembers)
	}, [])

  const getMembers = () => {
    setLoading(true)
    organization
      .getMembersOf({
        filter: "",
        limit: 3,
        offset: null
      })
      .then(setUserList)
      .finally(_ => setLoading(false))
  }

  const setUserList = (data) => {
    const values = data.values
    const userList = values.map(user => ({
      src: `user/profile_picture/${user.id}`,
      alt: user.username,
      onClick: e => PageController.push(`/user/${props.id}`, e)
    }))
    
    setSmallUserList({
      userList: userList,
      totalMember: data.total,
    })
  }

  return (
    <div className={classes.avatarGroup}>
      <CustomAvatarGroup
        onExtraAvatarClick={_ => setOpenDialog(true)}
        loading={loading}        
        direction={mobileView ? "horizontal" : "vertical"}
        spacing={12}
        borderWidth={4}
        borderColor={theme.palette.background.paperSecondary}
        avatarsProps={smallUserList.userList}
        numberOfAvatar={smallUserList.totalMember}
      />
      <AllOrganizationUserDialog
        open={openDialog}
        onClose={_ => setOpenDialog(false)}
        organization={organization}
      />
    </div>
  )
}