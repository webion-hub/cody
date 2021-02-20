import React, { useEffect } from 'react';
import { Grid, Typography, Link, Button, TextField, Paper } from '@material-ui/core';
import { DialogBase } from 'src/components/bases/dialog_base';

import { Reading } from 'src/components/illustrations/reading'
import { Form } from 'src/lib/default_values/sizes/form_size';

export function EditableBiography(props){
	const [editMode, setEditMode] = React.useState(false);

	const [value, setValue] = React.useState(props.value);
	const [tempValue, setTempValue] = React.useState(props.value);
  const maxCharacters = 64;
  const currentCharacters = tempValue? tempValue.length : 0;
  const noBiography = currentCharacters === 0;
  const error = currentCharacters > maxCharacters;

	const {onChange} = props;
	
	useEffect(() => {
    setValue(props.value)
    setTempValue(props.value)
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

	return (
    <div>
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
        firstButton={
          <Button 
            color="secondary"
            onClick={handleUndo}
          >
            Reset
          </Button>
        }
        secondButton={
          <Button 
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Conferma
          </Button>
        }
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >  
          <Reading size={Form.imageWidth}/>
          <TextField
            label="Descrizione"
            multiline
            color="secondary"
            variant="filled"
            fullWidth
            rows={6}
            defaultValue={value}
            onChange={handleChange}
            error={error}
          />
        </Grid>
        <Typography
          variant="caption"
          color={error ? "error" : "textSecondary"}
        >
          {currentCharacters}/{maxCharacters}
        </Typography>
      </DialogBase>
    </div>
	);
}