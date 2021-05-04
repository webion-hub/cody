import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

export function EditableCustomTextField(props){
	const [isInEditMode, setIsInEditMode] = React.useState(false);
	const [value, setValue] = React.useState(undefined);
	const {onChange} = props;

	useEffect(() => {
		if(!props.loading && value === undefined)
			setValue(props.value)

    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.loading, value])

	const handleEdit = () => {
		setIsInEditMode(true);
	}
	
	const handleUndo = () => {
		setIsInEditMode(false);
		setValue(props.value);
		onChange(props.value);
	}
	
	const handleChange = (event) => {
		setValue(event.target.value);
	}
	
	const handleSubmit = () => {
		setIsInEditMode(false);
		onChange(value);
	}

	const textFieldEndAdornment = 
		<InputAdornment position="end">
			{
				isInEditMode &&
					<IconButton
						onClick={handleUndo}                    
					>
						<UndoRoundedIcon /> 
					</IconButton>
			}
			<IconButton
				onClick={isInEditMode ? handleSubmit : handleEdit}
			>
				{isInEditMode ? <CheckRoundedIcon/> : <EditRoundedIcon />}                  
			</IconButton>
		</InputAdornment>

	return (
		<ClickAwayListener onClickAway={isInEditMode ? () => handleSubmit : () => {}}>
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
							focused={isInEditMode}
							onChange={handleChange}
							onKeyDown={(e) => {								
								if (e.key === "Enter" && !props.disableEnterSubmit) {
									handleSubmit();
								}
							}}
							InputProps={{
								readOnly: !isInEditMode,
								endAdornment: textFieldEndAdornment
							}}
						/>
				}
			</Box>
		</ClickAwayListener>
	);
}