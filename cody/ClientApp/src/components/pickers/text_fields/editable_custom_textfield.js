import React from 'react';
import { Box, IconButton, InputAdornment } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

export function EditableCustomTextField(props){
    const [edit, setEdit] = React.useState(false);
    const [value, setValue] = React.useState(props.value);
		const {valueIsEdited} = props;
		const {resetIsEdited} = props;
  
    const handleEdit = () => {
			setEdit(true);
      valueIsEdited(true); 
    }
    const handleUndo = () => {
      setEdit(false);
			setValue(props.value);
      resetIsEdited(); 
    }
    const handleChange = (event) => {
      setValue(event.target.value);
    }
    const handleSubmit = () => {
      setEdit(false);

      if(value !== props.value){
          const {getValue} = props;
      getValue(value); 
      valueIsEdited(true); 
      
      return;
    }
    resetIsEdited(); 
  }
  
      return (
        <Box mb={props.mb} mt={props.mt}>
					<TextField
						label={props.title}
						value={value}
						color="secondary"
						variant="filled"
						error={props.error}
						fullWidth
						onChange={handleChange}
						InputProps={{
							readOnly: !edit,
							endAdornment: (
								<InputAdornment position="end">
									{
										edit ? 
											<IconButton
												onClick={handleUndo}                    
											>
												<UndoRoundedIcon /> 
											</IconButton>
										:
											null
									}
									<IconButton
										onClick={edit ? handleSubmit : handleEdit}
									>
										{edit ? <CheckRoundedIcon/> : <EditRoundedIcon />}                  
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
          </Box>
      );
  }