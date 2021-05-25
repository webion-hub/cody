import { Grid, Link, Tooltip, Typography } from '@material-ui/core';
import { PageController } from "src/lib/page_controller";
import { CustomAvatar } from "src/components/custom_avatar";
import { ProfilePicture } from "src/lib/server_calls/profile_picture";

export default function TooltipLink({user}){
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
          <Typography variant="capiton">
            {user.name}
          </Typography>
          <Typography variant="capiton">
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
