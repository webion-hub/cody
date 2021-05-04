import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import makeStyles from '@material-ui/core/styles/makeStyles';

import { InteractiveIconBase } from 'src/components/bases/interactive_icon_base/interactive_icon_base';

import { PageController } from 'src/lib/page_controller';
import { LoggedAvatarMenu } from './components/logged_avatar_menu';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    margin: 6
  },
}));

export function UserAvatarIcon(){  
  const classes = useStyles();
  
  const loggedChildren = 
    <LoggedAvatarMenu/>
  
  const notLoggedChildren = 
    <Tooltip
      arrow
      interactive
      title={
        <Typography 
          variant="caption"
        >
          Accedi o registrati
        </Typography>
      }
    >
      <Button
        href="/login"
        className={classes.loginButton}
        onClick={(e) => PageController.push('/login', e)}
      >
        Login
      </Button>
    </Tooltip> 

  return (    
    <InteractiveIconBase 
      loggedContent={loggedChildren}
      notLoggedContent={notLoggedChildren}
    />
  );
}