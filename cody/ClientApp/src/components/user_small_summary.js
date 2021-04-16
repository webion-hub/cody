import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core'

import { CustomAvatar } from "src/components/custom_avatar";
import { PageController } from "src/lib/page_controller";
import { UserRoleLabel } from "src/components/user_role_label";

import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import { UserSettingsMenu } from "./menu/menus/user_settings_menu";

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: 220,
  },
  usernameAvatarContainer: {
    marginBottom: theme.spacing(1),
    background: theme.palette.background.paperSecondary,
    borderRadius: 28,
  },
  userInfoTextBox: {
    tableLayout: "fixed",
    width: "100%",
    marginLeft: theme.spacing(1),
  },
  openUserPage: {
    marginTop: theme.spacing(1),
    marginRight: -theme.spacing(1),
    marginLeft: -theme.spacing(1),
    background: theme.palette.background.paperSecondary
  },
  userInfoText: {
    width: "100%",
    tableLayout: "fixed",
  },
  roleIcon: {
    transform: "translate(0, 4px)",
    marginRight: theme.spacing(0.5)
  },
  goToUserPageIcon: {
    position: "absolute",
    right: 0
  }
}));

export const UserSmallSummary = React.forwardRef((props, ref) => {
	const classes = useStyles();
  const { user, callerIs } = props
  return (
    <Grid
      ref={ref}
      container
      direction="column"
      className={classes.container}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.usernameAvatarContainer}
      >
        <CustomAvatar
          src={`user/profile_picture/${user.id}`}
          alt={user.username}
          size={56}
        />
        <div>
          <Typography
            className={classes.userInfoTextBox}
            noWrap
            variant="subtitle1"
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
      <Typography
        className={classes.userInfoText}
        noWrap
        variant="body1"
        color="textSecondary"
      >
        <UserRoleLabel 
          role={user.role}
          className={classes.roleIcon}
        />
      </Typography>

      <div className={classes.openUserPage}>
        <UserSettingsMenu
          user={user}
          callerIs={callerIs}
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