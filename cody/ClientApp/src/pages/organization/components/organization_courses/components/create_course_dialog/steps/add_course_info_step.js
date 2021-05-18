import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

import { BasePhotoText } from "src/components/bases/base_photo_text";

import { DescriptionTextField } from "src/components/pickers/text_fields/types/description_text_field";
import { School } from "src/components/illustrations/illustrations/illustrations";

const useStyles = makeStyles((theme) => ({
  description: {
    marginTop: theme.spacing(2),
  },
  nameTextField: {
    marginTop: theme.spacing(1)
  },
}));

export default function AddCourseInfoStep(props){
	const classes = useStyles();

  return (
    <BasePhotoText image={School}>
      <Typography>
        Dai un nome al corso
      </Typography>
      <TextField
        className={classes.nameTextField}
        color="secondary" 
        label="Nome corso" 
        fullWidth 
        variant="filled"
        required
        onChange={props.onTitleChange}
        error={props.errors.courseTitleError}
        defaultValue={props.values.title}
      />
      <DescriptionTextField
        className={classes.description}
        variant="filled"
        fullWidth
        onChange={props.onDescriptionChange}
        error={props.errors.descriptionError}
        defaultValue={props.values.description}
        descriptionLength={props.values.description.length}
      />
    </BasePhotoText>
  )
}