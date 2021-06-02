import { IconButton, Tooltip, useTheme } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

import { InteractiveIconBase } from 'src/components/bases/others/interactive_icon_base/interactive_icon_base';

const useStyles = makeStyles((theme) => ({
  notificationsButton: {
    width: 40,
    height: 40,
    margin: 4,
  },
}));

export function NotificationsIcon(){
  const classes = useStyles();
  const theme = useTheme()

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
                <NotificationsRoundedIcon style={{color: theme.palette.secondary.contrastText}}/>
            </Badge>
          </IconButton>
        </Tooltip>
      }
    />
  );
}