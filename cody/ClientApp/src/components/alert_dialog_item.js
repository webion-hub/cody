import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: "flex"
  },
	errorIcon: {
    marginRight: "1rem",
    display: "flex"
	}
}));

export function AlertDialogItem(props){
  const classes = useStyles();

	return (
    <div className={classes.messageContainer}>
      <div className={classes.errorIcon}> 
        {props.icon}
      </div>
      {props.label}
    </div>
	)
}