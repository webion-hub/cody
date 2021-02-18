import React, { useEffect } from 'react';
import { Box, IconButton, InputAdornment } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ClickAwayListener } from '@material-ui/core';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

export function EditableCustomTextField(props){
	const [editMode, setEditMode] = React.useState(false);
	const [value, setValue] = React.useState(undefined);
	const {onChange} = props;

	useEffect(() => {
		if(!props.loading && value === undefined)
			setValue(props.value)
	})

	const handleEdit = () => {
		setEditMode(true);
	}
	
	const handleUndo = () => {
		console.log("undo")

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
		<ClickAwayListener onClickAway={editMode ? handleSubmit() : () => {}}>
			<Box mb={props.mb?props.mb : 0} mt={props.mt?props.mt : 0}>
				{
					props.loading ? 
						<Skeleton variant="rect" height={56} animation="wave"/>
						:
						<TextField
							label={props.title}
							value={value? value : ""}
							multiline={props.multiline}
							color="secondary"
							variant="filled"
							error={props.error}
							fullWidth
							focused={editMode}
							onChange={handleChange}
							onKeyDown={(e) => {								
								if (e.key === "Enter" && !props.disableEnterSubmit) {
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
				}
			</Box>
		</ClickAwayListener>
	);
}