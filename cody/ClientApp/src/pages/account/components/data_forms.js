import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { EditableCustomTextField } from 'src/components/pickers/text_fields/editable_text_fields/editable_custom_textfield'
import { EditableDatePicker } from 'src/components/pickers/text_fields/editable_text_fields/editable_date_picker';
import { PickerWithErrorAndLabel } from 'src/components/pickers/picker_with_error_and_label';


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
			
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.loading, data])

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
			<PickerWithErrorAndLabel
				fadeError={props.errors.usernameExist}
				errorLabel="Username già usato!"
			>
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
			</PickerWithErrorAndLabel>
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
			<PickerWithErrorAndLabel
				fadeError={props.errors.emailExist}
				errorLabel="Email già usata!"
			>
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
			</PickerWithErrorAndLabel>
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
		</div>
	);
}