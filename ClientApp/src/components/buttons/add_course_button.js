import React from 'react';

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { IconButton, Tooltip } from "@material-ui/core";
import { CreateCourseDialog } from '../dialogs/create_course_dialog/create_course_dialog';

export function AddCourseButton(props){
  const [openDialog, setOpenDialog] = React.useState(false)

  const {
    callerIs
  } = props
  const canCallerAddCourse = callerIs !== "noMember"

  if(canCallerAddCourse)
    return (
      <>
        <Tooltip
          arrow
          placement="right"
          title="Aggiungi un corso"
        >
          <IconButton
            onClick={_ => setOpenDialog(true)}
          >
            <AddRoundedIcon/>
          </IconButton>
        </Tooltip>
        <CreateCourseDialog
          open={openDialog}
          onClose={_ => setOpenDialog(false)}
        />
      </>
    );

  return <></>
}