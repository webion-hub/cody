import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { DialogBase } from 'src/components/bases/dialog_base';

import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'
import { DescriptionTextField } from '../types/description_text_field';
import { Reading } from 'src/components/illustrations/illustrations/illustrations';

export function EditableBiography(props){
	const [editMode, setEditMode] = React.useState(false);

	const [value, setValue] = React.useState(props.value);
	const [tempValue, setTempValue] = React.useState(props.value);
  const maxCharacters = FormatLengthController.set('description').max;
  const currentCharacters = tempValue? tempValue.length : 0;
  const noBiography = currentCharacters === 0;
  const error = currentCharacters > maxCharacters;

	const {onChange} = props;
	
	useEffect(() => {
    setValue(props.value)
    setTempValue(props.value)

    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.value])

	const handleEdit = () => {
		setEditMode(true);
	}
	
	const handleUndo = () => {
		setEditMode(false);
		setValue(props.value);
		onChange(props.value);
	}
	
	const handleChange = (event) => {
		setTempValue(event.target.value);
	}

	const handleSubmit = () => {
    if(!error){
      setEditMode(false);
      setValue(tempValue);
      onChange(tempValue);
    }
	}

  const dialogFirstButton = 
    <Button 
      color="secondary"
      onClick={handleUndo}
    >
      Reset
    </Button>

  const dialogSecondButton = 
    <Button 
      variant="contained"
      color="primary"
      onClick={handleSubmit}
    >
      Conferma
    </Button>

	return (
    <>
      <Typography
        variant="caption"
      >
        {noBiography ? "Nessuna Biografia - " : "Biografia - "}
        <Link
          color="secondary"
          component="button"
          variant="caption"
          onClick={handleEdit}
        >
          {noBiography ? "Aggiungi" : "Modifica"}
        </Link>
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
      >
        {value}
      </Typography>
      <DialogBase
        title={props.title}
        open={editMode}
        onClose={() => setEditMode(false)}
        firstButton={dialogFirstButton}
        secondButton={dialogSecondButton}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >  
          <Reading/>
          <DescriptionTextField
            variant="filled"
            fullWidth
            defaultValue={value}
            onChange={handleChange}
            error={error}
            descriptionLength={currentCharacters}
          />
        </Grid>
      </DialogBase>
    </>
	);
}