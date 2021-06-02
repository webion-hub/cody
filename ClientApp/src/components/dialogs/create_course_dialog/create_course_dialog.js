import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, useTheme } from '@material-ui/core'

import { DialogBase } from "src/components/bases/others/dialog_base";
import { lazyLoader } from 'src/components/utilities/lazy_loader';

const CreateCourse = lazyLoader(() => import('./create_course'))


const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: 0,
  },
  dialogPaper: {
    maxWidth: 616,
    width: "100%"
  },
  description: {
    marginTop: theme.spacing(2),
  },
  nameTextField: {
    marginTop: theme.spacing(1)
  },
}));

export function CreateCourseDialog(props){
	const classes = useStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <DialogBase
      fullScreen={mobileView}
      className={classes.dialogContent}
      paperClassName={classes.dialogPaper}
      open={props.open}
      onClose={props.onClose}
    >
      <CreateCourse 
        suspenseHeight={400}
        onClose={props.onClose}
      />
    </DialogBase>
  );
}