import React, { useEffect } from 'react';
import { Box, TextField, IconButton, InputAdornment, Button, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { DatePicker } from 'src/components/pickers/text_fields/date_picker';
import { DialogBase } from 'src/components/bases/dialog_base';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Calendar } from 'src/components/illustrations/calendar';

import { BirthDateController } from 'src/lib/format_controller/id_controllers';

import { Form } from 'src/lib/default_values/sizes/form_size';

export function EditableDatePicker(props){
	const [editMode, setEditMode] = React.useState(false);
	const [value, setValue] = React.useState(undefined);
	const [error, setError] = React.useState(false);
	const [tempValue, setTempValue] = React.useState(props.value);
	const {onChange} = props;

	useEffect(() => {
		if(!props.loading && value === undefined)
			setValue(props.value)
	})
	
	const handleEdit = () => {
		setEditMode(true);
	}
	
	const handleUndo = () => {
		setEditMode(false);
		setValue(props.value);
		onChange(props.value);
	}
	
	const handleChange = (value) => {
		setTempValue(value);
		setError(false);

		const birthDateController = new BirthDateController();
		birthDateController
		.checkBirthDate(value, false)
		.then(
			result => {
				if(result) {
					setError(true)
				}
			},
		)
	}
	
	const handleSubmit = () => {
		if(!error){
			setEditMode(false);
			setValue(tempValue);
			onChange(tempValue);
		}
	}

	return (
		<Box mb={props.mb?props.mb : 0} mt={props.mt?props.mt : 0}>
			{
				props.loading ? 
					<Skeleton variant="rect" height={56} animation="wave"/>
					:
					<>
						<TextField
							label={props.title}
							value={value? value.split(' ')[0] : ""}
							color="secondary"
							variant="filled"
							error={props.error}
							fullWidth
							focused={editMode}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleSubmit();
								}
							}}
							InputProps={{
								readOnly: true,
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={handleEdit}
										>
											<EditRoundedIcon/>               
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<DialogBase
							title={props.dialogTitle}
							open={editMode}
							onClose={() => setEditMode(false)}
							firstButton={
								<Button 
									onClick={handleUndo}
									color="secondary"
								>
									Reset
								</Button>
							}
							secondButton={
								<Button 
									onClick={handleSubmit}
									variant="contained"
									color="primary"
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
								<Calendar size={Form.imageWidth}/>
								<DatePicker
									variant="filled"
									value={value}
									onChange={handleChange}
									error={error}
								/>
							</Grid>
						</DialogBase>
					</>
			}
	</Box>
	);
}

