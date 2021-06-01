import { Grid, Link, Tooltip, Typography } from '@material-ui/core';
import { PageController } from "src/lib/page_controller";
import { ProfilePicture } from "src/lib/server_calls/profile_picture";
import { CustomAvatar } from './custom_avatar';

export default function TooltipAvatarLink({user}){
  return(
    <Tooltip
      arrow
      placement="top"
      title={
        <Grid
          container
          direction="column"
          alignItems="center"
        >
          <CustomAvatar
            alt={user.username}
            src={ProfilePicture.url`/${user.id}`}
          />
          <Typography variant="caption">
            {user.name}
          </Typography>
          <Typography variant="caption">
            {user.surname}
          </Typography>
        </Grid>
      }
    >
      <Link 
        color="inherit" 
        component="button" 
        onClick={e => PageController.push(`/user/${user.id}`, e)}
      >
        {user.username}
      </Link>
    </Tooltip>
  );
}
