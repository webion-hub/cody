import React from 'react';
import { Box, Grid, Typography, Fade } from '@material-ui/core';

import { EditableCustomTextField } from 'src/components/pickers/text_fields/editable_custom_textfield'


export function DataForms(props){
  const [data, setData] = React.useState(props.data);
  
  const getValue = (dataName) => (value) => {
		const dataUpdated = {
			...data,
			[dataName]: value,
		}

    setData(dataUpdated);
		
		const {onDataChange} = props;
		onDataChange(dataUpdated); 
  }

	return (
		<Box mt={4}>
			<EditableCustomTextField 
				title="Username" 
				value={props.oldData.username} 
				getValue={getValue("username")}
				valueIsEdited={props.handleAValueIsEdited}
				resetIsEdited={props.resetAValueIsEdited}
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
				getValue={getValue("name")}
				valueIsEdited={props.handleAValueIsEdited}
				resetIsEdited={props.resetAValueIsEdited}
				error={props.errors.nameError}
				mb={1}
				mt={1}
			/>
			<EditableCustomTextField 
				title="Cognome" 
				value={props.oldData.surname} 
				getValue={getValue("surname")}
				valueIsEdited={props.handleAValueIsEdited}
				resetIsEdited={props.resetAValueIsEdited}
				error={props.errors.surnameError}
				mb={1}
			/>
			<EditableCustomTextField 
				title="Email" 
				value={props.oldData.email} 
				getValue={getValue("email")}
				valueIsEdited={props.handleAValueIsEdited}
				resetIsEdited={props.resetAValueIsEdited}
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
			<EditableCustomTextField 
				title="Istituto" 
				value={props.oldData.school} 
				getValue={getValue("school")}
				valueIsEdited={props.handleAValueIsEdited}
				resetIsEdited={props.resetAValueIsEdited}
				error={props.errors.school}
				mb={1}
				mt={1}
			/>
			<EditableCustomTextField 
				title="Data di nascita" 
				value={props.oldData.birthDate} 
				getValue={getValue("birthDate")}
				valueIsEdited={props.handleAValueIsEdited}
				resetIsEdited={props.resetAValueIsEdited}
				error={props.errors.birthDate}
			/>
		</Box>
	);
}

