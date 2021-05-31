import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

import { CustomAvatar } from "src/components/avatars/custom_avatar";
import { ImageWithOverlay } from "src/components/images/image_with_overlay";
import { ProfilePicture } from "src/lib/server_calls/profile_picture";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    width: 48,
    height: 67,
  },
  avatarLabel: {
    width: 48,
    textAlign: "center",
    userSelect: "none"
  },
}));

export function AvatarWithOverlayAndLabel(props){
  const {
    user,
    onDelete,
    className
  } = props
	const classes = useStyles();

  return (
    <Grid
      className={`${classes.avatar} ${className}`}
      container
      direction="column"
      justify="center"
    >
      <ImageWithOverlay
        overlayContent={
          <IconButton 
            className={"noScroll"}
            onClick={_ => onDelete([user])}
          >
            <ClearRoundedIcon/>
          </IconButton>
        }
      >
        <CustomAvatar
          alt={user.username}
          src={ProfilePicture.url`/${user.id}`}
          size={48}
          disableLoadingRing
        />
      </ImageWithOverlay>
      <Typography 
        className={classes.avatarLabel}
        variant="caption" 
        noWrap
      >
        {user.username}
      </Typography>
    </Grid>
  )
}

AvatarWithOverlayAndLabel.defaultProps = {
  className: ""
}