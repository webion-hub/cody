
import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Link } from '@material-ui/core';
import { Fade } from '@material-ui/core';

import { BasePhotoText } from '../../../../components/base_photo_text'
import { AddSchoolDialog } from '../../sign_up_components/add_school_dialog'
import { AddPhoto } from '../../../../components/add_photo';
import { Colors } from '../../../../lib/default_values/custom_colors'
import { NextFocus } from '../../../../lib/next_focus';
import { School } from '../../../../lib/school';

import { Step3 } from '../../../../components/illustrations/step3';

export class OptionalData extends Component{
  constructor(props){
    super(props);
    this.handleOpen = this.handleOpen.bind(this);    
    this.getSchool = this.getSchool.bind(this);
    this.getImage = this.getImage.bind(this);

    this.state = {
      open: false,
      schoolId: this.props.values.schoolId,

      schoolsList: [],
      schoolFromDialog: null,
    }

    this.nextFocus = new NextFocus(["school"]);

    School.getAll().then(schools => {
      this.setState({schoolsList: schools});
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
    this.setState({schoolId: value.id});

    const {school} = this.props;
    school(value.id);
  }

  getSchoolFromDialog = (value) => {
    this.setState({schoolFromDialog: value});
    const {school} = this.props;
    school(value.id);
  }

  render(){
    return (
      <BasePhotoText
        image={<Step3 size={this.props.imageWidth}/>}
        formWidth={this.props.formWidth}
        margin={1}
        bottomMargin={2}
        items={[
          <Box mb={3}>
            <Paper 
              elevation={3}
              style={{
                backgroundColor: Colors.background
              }}
            >
              <Box p={2}>
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
              </Box>
            </Paper>
          </Box>,
          <Box>
            <Typography
              variant="body2"
              color="secondary"
            >
              Sei uno studente?
            </Typography>
            <Box m={1}/>
            <Autocomplete
              id="school"
              selectOnFocus
              handleHomeEndKeys
              clearOnBlur
              freeSolo
              value={this.state.schoolFromDialog}
              disabled={this.state.schoolFromDialog != null}
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
              in={this.state.schoolFromDialog == null}
            >
              <Link
                style={{
                  fontSize: 12,
                  color: Colors.lightGrey
                }}
                disabled={this.state.schoolFromDialog != null}
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
