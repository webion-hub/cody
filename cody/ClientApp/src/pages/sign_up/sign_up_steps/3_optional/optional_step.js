
import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Link } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { AddSchoolDialog } from '../../sign_up_components/add_school_dialog'
import { AddPhoto } from 'src/components/pickers/add_photo';
import { NextFocus } from 'src/lib/next_focus';
import { School } from 'src/lib/school';

import { Step3 } from 'src/components/illustrations/step3';

export class OptionalData extends Component{
  constructor(props){
    super(props);
    this.handleOpen = this.handleOpen.bind(this);    
    this.getSchool = this.getSchool.bind(this);
    this.getImage = this.getImage.bind(this);

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

  getImage = (value) => {
    const {profileImage} = this.props;
    profileImage(value);
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
      <BasePhotoText
        image={<Step3 size={this.props.imageWidth}/>}
        formWidth={this.props.formWidth}
        margin={1}
        bottomMargin={2}
        items={[
          <Box 
            p={2}
            mb={3}
          >         
            <Grid
              container
              justify="center"
            >
              <AddPhoto
                size={150}
                iconSize={90}
                image={this.getImage}
              />
              <Box
                mt={2}
              >
                <Typography
                  variant="subtitle2"
                >
                  Aggiungi un'immagine profilo
                </Typography>
              </Box>
            </Grid>
          </Box>,
          <Box>
            <Grid
              container
              direction="row"              
            >
              <Typography
                variant="body2"
                color="secondary"
              >
                Sei uno studente?
              </Typography>
              <Fade
                in={this.state.loading}
              >
                <Box
                  ml={1}
                >
                  <CircularProgress
                    color="secondary"
                    size={15}
                  />
                </Box>
              </Fade>
            </Grid>
            <Box m={1}/>
            <Autocomplete
              id="school"
              selectOnFocus
              handleHomeEndKeys
              clearOnBlur
              freeSolo
              value={this.state.school}
              disabled={this.state.isAddedSchool || this.state.loading}
              onChange={(event, value) => this.getSchool(value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.nextFocus.removeFocus();
                }
             }}
              options={this.state.schoolsList}
              getOptionLabel={(option) => (option.name + " - " + option.city)}
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
              style={{ maxWidth: 300 }}
              renderInput={
                (params) => 
                <TextField 
                  {...params} 
                  label="Istituto" 
                  variant="outlined" 
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
          </Box>,
        ]}
      />
    );
  }
}
