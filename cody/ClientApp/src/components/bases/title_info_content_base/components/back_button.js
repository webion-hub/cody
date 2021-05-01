import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { PageController } from 'src/lib/page_controller';

const useStyles = makeStyles((theme) => ({
  backButton: {
    position: "absolute",
    left: 0
  },
}));

export function BackButton(props){
  const classes = useStyles();

  if(props.hideBackButton)
    return <></>;

  return(
    <IconButton 
      className={classes.backButton}
      onClick={PageController.goBack}
    >
      <ArrowBackRoundedIcon/>
    </IconButton>
  );
}

