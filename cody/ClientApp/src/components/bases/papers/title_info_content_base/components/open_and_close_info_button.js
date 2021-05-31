import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InfoRounded from '@material-ui/icons/InfoRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { PageController } from 'src/lib/page_controller';

const useStyles = makeStyles((theme) => ({
  infoButton: {
    position: "absolute",
    right: 0
  },
}));

export function OpenAndCloseInfoButton(props){
  const classes = useStyles();

  if(props.hideInfoButton)
    return (
      <IconButton 
        className={classes.infoButton}
        onClick={PageController.goBack}
      >
        <CloseRoundedIcon/>
      </IconButton>
    )
  else
    return (
      <IconButton 
        className={classes.infoButton}
        onClick={(e) => PageController.updateHash("info", e)}
      >
        <InfoRounded/>
      </IconButton>
    )
}

