import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { IconButton, InputAdornment, Button, Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { SchoolPicker } from 'src/components/pickers/school_picker';
import { DialogBase } from 'src/components/bases/dialog_base';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { GoToSchool } from 'src/components/illustrations/go_to_school'

import { Form } from 'src/lib/default_values/sizes/form_size';


export function EditableSchoolPicker(props){
	const [editMode, setEditMode] = React.useState(false);
	const [isAddedSchool, setIsAddedSchool] = React.useState(false);

	const [value, setValue] = React.useState(undefined);
	const [tempValue, setTempValue] = React.useState(null);
	const {onChange} = props;
	
	useEffect(() => {
		if(!props.loading && value === undefined){
			setValue(props.value)
			setTempValue(props.value)
		}
	})

	const handleEdit = () => {

		setEditMode(true);
	}
	
	const handleUndo = () => {
		setEditMode(false);
		setIsAddedSchool(false);
		setValue(props.value);
		onChange(props.value);
	}
	
	const handleChange = (value) => {
		setTempValue(value);
	}

	const handleSubmit = () => {
		setEditMode(false);
		setValue(tempValue);
		onChange(tempValue);
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
							value={value? value.name + " - " + value.city : ""}
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
								<GoToSchool size={Form.imageWidth}/>
								<SchoolPicker
									variant="filled"
									imageWidth = {Form.imageWidth}
									formWidth = {Form.width}
									values={{
										school: value,
										isAddedSchool: isAddedSchool
									}}
									school={handleChange}
									isAddedSchool={setIsAddedSchool}
								/>
							</Grid>
						</DialogBase>
					</>
			}
	</Box>
	);
}

