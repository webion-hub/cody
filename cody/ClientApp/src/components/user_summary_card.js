import React from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { CustomAvatar } from "src/components/custom_avatar";
import makeStyles from '@material-ui/core/styles/makeStyles';

import { UserRoleLabel } from "src/components/user_role_label";
import { UserSettingsMenu } from "src/components/menu/menus/user_settings_menu";
import { PageController } from "src/lib/page_controller";
import { ProfilePicture } from "src/lib/server_calls/profile_picture";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.paperSecondary,
    marginRight: 14,
    height: "100%",
  },
  userSettingsMenu: {
    position: "absolute",
    right: theme.spacing(2) - 2, 
  },
  userInfoContainer: {
    padding: theme.spacing(2),
    background: theme.palette.background.backgroundTransparent
  },
  username: {
    marginTop: theme.spacing(1),
    width: "100%",
    textAlign: "center"
  },
  open: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0px)",
    bottom: theme.spacing(2)
  },
  close: {
    position:"absolute",
    left: 0
  },
  roleContainer: {
    marginTop: theme.spacing(2)
  },
  roleLabel: {
    marginRight: theme.spacing(1)
  }
}));

export function UserSummaryCard(props){
	const classes = useStyles();
  const {
    user,
    leftIcon,
    callerIs,
    handler,
    onUserUpdate
  } = props
  
  const leftIconWithProps = React.Children.map(leftIcon, child =>
    React.cloneElement(child, { className: classes.close }),
  );

  return (
    <Paper className={classes.paper}>
      {leftIconWithProps}
      <UserSettingsMenu
        className={classes.userSettingsMenu}
        userId={user.id}
        callerIs={callerIs}
        handler={handler}
        onUserUpdate={onUserUpdate}
      />
      <Grid
        className={classes.userInfoContainer}
        container
        direction="column"
        alignItems="center"
      >
        <CustomAvatar
          src={ProfilePicture.url`/${user.id}`}
          alt={user.username}
          size={80}
        />
        <Typography
          className={classes.username}
          noWrap
          variant="subtitle1"
        >
          {user.username}
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography
            noWrap
            variant="body2"
            color="textSecondary"
          >
            {user.name} {user.surname}
          </Typography>
        </Grid>    
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.roleContainer}
      >
        <Typography
          className={classes.roleLabel}
          noWrap
          variant="body2"
          color="textSecondary"
        >
          Ruolo
        </Typography>
        <UserRoleLabel
          yTranslate={-1}
          role={user.role}
          noWrap
          variant="body2"
          color="textSecondary"
        />
      </Grid>
      <Button
        className={classes.open}
        variant="outlined"
        color="secondary"
        href={`/user/${user.id}`}
        onClick={e => PageController.push(`/user/${user.id}` ,e)}
      >
        Apri
      </Button>
    </Paper>
  )
}