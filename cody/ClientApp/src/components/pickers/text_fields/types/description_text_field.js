import { TextField } from '@material-ui/core';
import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller';
import { PickerWithErrorAndLabel } from 'src/components/pickers/picker_with_error_and_label';

export function DescriptionTextField(props){
  const {
    descriptionLength,
    ...textFildProps
  } = props

  const maxDescriptionLength = FormatLengthController.set('description').max
  const tooLength = descriptionLength > maxDescriptionLength

  return(
    <PickerWithErrorAndLabel
      leftMessage={`${descriptionLength}/${maxDescriptionLength}`}
      leftMessageColor={tooLength ? "error" : "textSecondary"}
    >
      <TextField
        color="secondary"
        label="Descrizione"
        multiline
        rows={6}
        {...textFildProps}
      />
    </PickerWithErrorAndLabel>
  );
}