import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import makeStyles from '@material-ui/core/styles/makeStyles';

import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

import { InteractiveIconBase } from 'src/components/bases/interactive_icon_base/interactive_icon_base';

const useStyles = makeStyles((theme) => ({
  notificationsButton: {
    width: 40,
    height: 40,
    margin: 4,
  },
}));

export function NotificationsIcon(){
  const classes = useStyles();
  
  return (
    <InteractiveIconBase
      loggedContent={
        <Tooltip
          arrow
          title="Notifiche"
        >
          <IconButton aria-label="delete" className={classes.notificationsButton}>
            <Badge 
              color="secondary" 
              badgeContent={22}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
                <NotificationsRoundedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      }
    />
  );
}