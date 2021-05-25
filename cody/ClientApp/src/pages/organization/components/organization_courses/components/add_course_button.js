import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { IconButton, Tooltip } from "@material-ui/core";

export function AddCourseButton(props){
  const {
    onAddCourse,
    callerIs
  } = props
  const canCallerAddCourse = callerIs !== "noMember"

  if(canCallerAddCourse)
    return (
      <Tooltip
        arrow
        placement="right"
        title="Aggiungi un corso"
      >
        <IconButton
          onClick={onAddCourse}
        >
          <AddRoundedIcon/>
        </IconButton>
      </Tooltip>
    );

  return <></>
}