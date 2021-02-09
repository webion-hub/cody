import React from 'react';
import { Box, IconButton, InputAdornment } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

export function EditableCustomTextField(props){
	const [editMode, setEditMode] = React.useState(false);
	const [value, setValue] = React.useState(props.value);
	const {onChange} = props;

	const handleEdit = () => {
		setEditMode(true);
	}
	
	const handleUndo = () => {
		setEditMode(false);
		setValue(props.value);
		onChange(props.value);
	}
	
	const handleChange = (event) => {
		setValue(event.target.value);
	}
	
	const handleSubmit = () => {
		setEditMode(false);
		onChange(value);
	}

		return (
			<Box mb={props.mb?props.mb : 0} mt={props.mt?props.mt : 0}>
				<TextField
					label={props.title}
					value={value}
					color="secondary"
					variant="filled"
					error={props.error}
					fullWidth
					focused={editMode}
					onChange={handleChange}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSubmit();
						}
					}}
					InputProps={{
						readOnly: !editMode,
						endAdornment: (
							<InputAdornment position="end">
								{
									editMode ? 
										<IconButton
											onClick={handleUndo}                    
										>
											<UndoRoundedIcon /> 
										</IconButton>
									:
										null
								}
								<IconButton
									onClick={editMode ? handleSubmit : handleEdit}
								>
									{editMode ? <CheckRoundedIcon/> : <EditRoundedIcon />}                  
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Box>
		);
  }