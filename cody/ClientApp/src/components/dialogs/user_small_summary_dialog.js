import { DialogBase } from "src/components/bases/others/dialog_base";
import { makeStyles } from '@material-ui/core/styles';
import { UserSmallSummary } from "src/components/user_summaries/user_small_summary";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: "0px !important",
  }
}));

export function UserSmallSummaryDialog(props){
	const classes = useStyles();
  const {
    userData,
    onClose,
    callerIs,
    handler,
    onUserUpdate,
  } = props

  return(
    <DialogBase
      className={classes.dialog}
      open={userData !== null}
      onClose={onClose}
    >
      <UserSmallSummary
        user={userData}
        callerIs={callerIs}
        handler={handler}
        onUserUpdate={onUserUpdate}
      />
    </DialogBase>
  )
}