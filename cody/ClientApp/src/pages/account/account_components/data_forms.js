import React, { useEffect } from 'react';
import { Box, Grid, Typography, Fade } from '@material-ui/core';

import { EditableCustomTextField } from 'src/components/pickers/text_fields/editable_custom_textfield'
import { EditableDatePicker } from './editable_date_picker';
import { EditableSchoolPicker } from './editable_school_picker';

export function DataForms(props){
  const [data, setData] = React.useState(undefined);

	useEffect(() => {
		if(!props.loading && data === undefined)
			setData(props.data)
	})

  const getValue = (dataName) => (value) => {
		const updateData = {
			...data,
			[dataName]: value,
		}
		
    setData(updateData);
		
		const {onDataChange} = props;
		onDataChange(updateData); 
  }

	return (
		<Box mt={4}>
			<EditableCustomTextField
				loading={props.loading}
				title="Username" 
				value={props.oldData.username} 
				onChange={getValue("username")}
				error={
					props.errors.usernameExist ||
					props.errors.usernameError
				}
			/>
			<Grid
				container
				direction="row"
				justify="flex-end"
			>
				<Fade
					in={props.errors.usernameExist}
				>
					<Typography
						variant="caption"
						color="error"
					>
						Username già usato!
					</Typography>
				</Fade>
			</Grid>
			<EditableCustomTextField 
				loading={props.loading}
				title="Nome" 
				value={props.oldData.name} 
				onChange={getValue("name")}
				error={props.errors.nameError}
				mb={1}
				mt={1}
			/>
			<EditableCustomTextField 
				loading={props.loading}
				title="Cognome" 
				value={props.oldData.surname} 
				onChange={getValue("surname")}
				error={props.errors.surnameError}
				mb={1}
			/>
			<EditableCustomTextField 
				loading={props.loading}
				title="Email" 
				value={props.oldData.email} 
				onChange={getValue("email")}
				error={
					props.errors.emailExist ||
					props.errors.emailError
				}
			/>
			<Grid
				container
				direction="row"
				justify="flex-end"
			>
				<Fade
					in={props.errors.emailExist}
				>
					<Typography
						variant="caption"
						color="error"
					>
						Email già usata!
					</Typography>
				</Fade>
			</Grid>
			<EditableDatePicker
				loading={props.loading}
				title="Data di nascita"
				dialogTitle="Cambia la tua data di nascita"
				value={props.oldData.birthDate}
				onChange={getValue("birthDate")}
				error={props.errors.birthDateError}
				mt={1}
				mb={1}
			/>
			<EditableSchoolPicker
				loading={props.loading}
				title="Istituto"
				dialogTitle="Cambia il tuo istituto"
				value={props.oldData.school}
				onChange={getValue("school")}
				mt={2}
				mb={1}
			/>
		</Box>
	);
}

