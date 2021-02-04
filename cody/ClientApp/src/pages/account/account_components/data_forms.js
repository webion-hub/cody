import React from 'react';
import { Box, Grid, Typography, Fade } from '@material-ui/core';

import { EditableCustomTextField } from 'src/components/pickers/text_fields/editable_custom_textfield'
import { DatePicker } from 'src/components/pickers/text_fields/date_picker';
import { SchoolPicker } from 'src/components/pickers/school_picker';

import { Form } from 'src/lib/default_values/sizes/form_size';

export function DataForms(props){
  const [data, setData] = React.useState(props.data);
  
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
				title="Nome" 
				value={props.oldData.name} 
				onChange={getValue("name")}
				error={props.errors.nameError}
				mb={1}
				mt={1}
			/>
			<EditableCustomTextField 
				title="Cognome" 
				value={props.oldData.surname} 
				onChange={getValue("surname")}
				error={props.errors.surnameError}
				mb={1}
			/>
			<EditableCustomTextField 
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
			<DatePicker
				variant="filled"
				value={props.oldData.birthDate}
				onChange={getValue("birthDate")}
			/>
			<Box mt={1}>
				<SchoolPicker
					variant="filled"
					imageWidth = {Form.imageWidth}
					formWidth = {Form.width}
					values={{
						school: props.oldData.school,
						isAddedSchool: props.oldData.isAddedSchool
					}}
					school={getValue("school")}
					isAddedSchool={getValue("isAddedSchool")}
				/>
			</Box>
		</Box>
	);
}

