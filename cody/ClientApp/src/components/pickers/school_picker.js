
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


export class SchoolPicker extends Component{
  constructor(props){
    super(props);
    this.handleOpen = this.handleOpen.bind(this);    
    this.getSchool = this.getSchool.bind(this);

    this.state = {
      open: false,
      school: this.props.values.school,

      schoolsList: [],
      isAddedSchool: this.props.values.isAddedSchool,

      loading: true,
    }

    this.nextFocus = new NextFocus(["school"]);

    School.getAll().then(schools => {
      this.setState({
        schoolsList: schools,
        loading: false,
      });
    });
  }

  handleOpen(value){
    this.setState({open: value});
  }

  getSchool = (value) => {
    if(!this.state.isAddedSchool)
    {
      this.setState({school: value});

      const {school} = this.props;
      school(value);   
      const {isAddedSchool} = this.props;
      isAddedSchool(false); 
    }
  }

  getSchoolFromDialog = (value) => {
    this.setState({
      school: value,
      isAddedSchool: true,
    });

    const {school} = this.props;
    school(value);  
    const {isAddedSchool} = this.props;
    isAddedSchool(true);
  }

  render(){
    return (
			<>
				<Autocomplete
					id="school"
					fullWidth
					value={this.state.school}
					disabled={this.state.isAddedSchool || this.state.loading}
					onChange={(event, value) => this.getSchool(value)}
					onKeyDown={this.props.onKeyDown}
					options={this.state.schoolsList}
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
							variant={this.props.variant} 
							color="secondary"
							fullWidth={true}
						/>
					}
				/>
				<Fade
					in={!this.state.isAddedSchool}
				>
					<Link
						style={{
							fontSize: 12,                  
						}}
						color="textSecondary"
						disabled={this.state.isAddedSchool}
						component="button"
						variant="caption"
						onClick={() => {
							this.handleOpen(true);
						}}
					>
						Non trovi il tuo Istituto? Aggiungilo
					</Link>
				</Fade>
				<AddSchoolDialog
					open = {this.state.open}
					onClose = {this.handleOpen}
					imageWidth = {this.props.imageWidth} 
					formWidth={this.props.formWidth}
					school={this.getSchoolFromDialog}
				/>        
			</>
    );
  }
}
