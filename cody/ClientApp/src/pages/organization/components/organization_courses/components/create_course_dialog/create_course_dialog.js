import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'

import { DialogBase } from "src/components/bases/dialog_base";
import { CustomStepper } from "src/components/stepper/custom_stepper/custom_stepper";
import { AddCourseInfoStep } from "./steps/add_course_info_step";
import { AddCourseTeachersStep } from "./steps/add_course_teachers_step";

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

  return (
    <DialogBase
      className={classes.dialogContent}
      paperClassName={classes.dialogPaper}
      open={props.open}
      onClose={props.onClose}
    >
      <CustomStepper
        onBackFirstPage={props.onClose}
        firstPageLabel="Chiudi"
        component={Box}
        elements={[
          {
            element: <AddCourseInfoStep/>,
            height: 411
          },
          {
            element: <AddCourseTeachersStep/>,
            height: 675
          },
        ]}
      />
    </DialogBase>
  );
}