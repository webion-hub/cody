
import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Link } from '@material-ui/core';
import { Fade } from '@material-ui/core';

import { AddSchoolDialog } from 'src/components/dialogs/add_school_dialog'
import { NextFocus } from 'src/lib/next_focus';
import { School } from 'src/lib/school';

import { Form } from 'src/lib/default_values/sizes/form_size';


export function SchoolPicker(props){
  const [openDialog, setOpenDialog] = React.useState(false);  
  const [school, setSchool] = React.useState(props.values.school);
  const [isAddedSchool, setIsAddedSchool] = React.useState(props.values.isAddedSchool);
  const [schoolsList, setSchoolsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

	School.getAll()
		.then(schools => {
			setSchoolsList(schools)
			setLoading(false)
		});

  const handleOpenDialog = (value) => {
    setOpenDialog(value);
  }

  const getSchool = (value) => {
    if(!isAddedSchool)
    {
      setSchool(value);

      const {school} = props;
      school(value);   
      const {isAddedSchool} = props;
      isAddedSchool(false); 
    }
  }

  const getSchoolFromDialog = (value) => {
		setSchool(value)
		setIsAddedSchool(true)

    const {school} = props;
    school(value);  
    const {isAddedSchool} = props;
    isAddedSchool(true);
  }


	return (
		<>
			<Autocomplete
				id="school"
				fullWidth
				value={school}
				disabled={isAddedSchool || loading}
				onChange={(event, value) => getSchool(value)}
				onKeyDown={props.onKeyDown}
				options={schoolsList}
				getOptionLabel={(option) => (option.name + " - " + option.city)}
				style={{ 
					maxWidth: Form.width,
					width: "100%"
				}}
				renderOption={(option) => (
					<Grid
						container
						direction="column"
					>
						{option.name}
						<Typography
							variant="caption"
						>
							{option.country} - {option.city}
						</Typography>
					</Grid>
				)}
				renderInput={
					(params) => 
					<TextField 
						{...params} 
						label="Istituto" 
						variant={props.variant} 
						color="secondary"
						fullWidth={true}
					/>
				}
			/>
			<Fade
				in={!isAddedSchool}
			>
				<Link
					style={{
						fontSize: 12,                  
					}}
					color="textSecondary"
					disabled={isAddedSchool}
					component="button"
					variant="caption"
					onClick={() => handleOpenDialog(true)}
				>
					Non trovi il tuo Istituto? Aggiungilo
				</Link>
			</Fade>
			<AddSchoolDialog
				open = {openDialog}
				onClose = {handleOpenDialog}
				onSchoolChange={getSchoolFromDialog}
			/>        
		</>
	);
}
