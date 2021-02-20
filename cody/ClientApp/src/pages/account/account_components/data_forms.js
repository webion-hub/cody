import React, { useEffect } from 'react';
import { Grid, Typography, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { EditableCustomTextField } from 'src/components/pickers/text_fields/editable_text_fields/editable_custom_textfield'
import { EditableDatePicker } from 'src/components/pickers/text_fields/editable_text_fields/editable_date_picker';
import { EditableSchoolPicker } from 'src/components/pickers/text_fields/editable_text_fields/editable_school_picker';


const useStyles = makeStyles((theme) => ({
  container: {
		width: 370,
		[theme.breakpoints.down('xs')]: {
			width: `calc(100vw - ${theme.spacing(4)}px)`
		},
  },
}));

export function DataForms(props){
  const [data, setData] = React.useState(undefined);
	const classes = useStyles();

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
		<div className={classes.container}>
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
			/>
			<EditableCustomTextField 
				loading={props.loading}
				title="Ruolo" 
				value={props.oldData.role} 
				onChange={getValue("role")}
				mt={1}
			/>
		</div>
	);
}

