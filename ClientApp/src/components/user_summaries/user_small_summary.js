import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core'

import { CustomAvatar } from "src/components/avatars/custom_avatar";
import { PageController } from "src/lib/page_controller";
import { UserRoleLabel } from "src/components/typography/user_role_label";

import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import { UserSettingsMenu } from "src/components/menu/menus/user_settings_menu";
import { ProfilePicture } from "src/lib/server_calls/profile_picture";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: 230,
    position: "relative"
  },
  usernameAvatarContainer: {
    marginBottom: theme.spacing(1),
    background: theme.palette.background[800],
    borderRadius: 28,
  },
  userInfoTextBox: {
    tableLayout: "fixed",
    width: 140,
    marginLeft: theme.spacing(1),
  },
  openUserPage: {
    marginTop: theme.spacing(1),
    marginRight: -theme.spacing(1),
    marginLeft: -theme.spacing(1),
    background: theme.palette.background[800],
    height: 44,
    borderRadius: 4
  },
  userInfoText: {
    width: "100%",
    tableLayout: "fixed",
  },
  goToUserPageIcon: {
    position: "absolute",
    right: 0
  }
}));

export const UserSmallSummary = React.forwardRef((props, ref) => {
	const classes = useStyles();
  const { user, callerIs, handler, className } = props
  
  if(user === null)
    return null

  return (
    <Grid
      ref={ref}
      container
      direction="column"
      className={`${classes.container} ${className}`}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.usernameAvatarContainer}
      >
        <CustomAvatar
          src={ProfilePicture.url`/${user.id}`}
          alt={user.username}
          size={56}
        />
        <div>
          <Typography
            className={classes.userInfoTextBox}
            noWrap
            variant="subtitle1"
            color="textPrimary"
          >
            {user.username}
          </Typography>
          <Typography
            className={classes.userInfoTextBox }
            noWrap
            variant="body2"
            color="textSecondary"
          >
            {user.name} {user.surname}
          </Typography>
        </div>
      </Grid>
      <Typography
        className={classes.userInfoText}
        noWrap
        variant="caption"
        color="textSecondary"
      >
        Ruolo
      </Typography>
      <UserRoleLabel 
        role={user.role}
        className={classes.userInfoText}
        noWrap
        variant="body1"
        color="textSecondary"
      />
      <div className={classes.openUserPage}>
        <UserSettingsMenu
          userId={user.id}
          callerIs={callerIs}
          handler={handler}
          onUserUpdate={props.onUserUpdate}
        />
        <IconButton
          className={classes.goToUserPageIcon}
          color="secondary"
          href={`/user/${user.id}`}
          onClick={e => PageController.push(`/user/${user.id}` ,e)}
        >
          <OpenInNewRoundedIcon fontSize="small"/>
        </IconButton>
      </div>
    </Grid>
  )
})