
import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import { BasePhotoText } from 'src/components/bases/base_photo_text'
import { AddPhoto } from 'src/components/pickers/add_photo';
import { SchoolPicker } from 'src/components/pickers/school_picker';

import { NextFocus } from 'src/lib/next_focus';

import { Step3 } from 'src/components/illustrations/step3';

export class OptionalData extends Component{
  constructor(props){
    super(props);
    this.getSchool = this.getSchool.bind(this);
    this.getImage = this.getImage.bind(this);
    this.getIsAddedSchool = this.getIsAddedSchool.bind(this);

    this.state = {
      school: this.props.values.school,

      schoolsList: [],
      isAddedSchool: this.props.values.isAddedSchool,
    }

    this.nextFocus = new NextFocus(["school"]);
  }

  getImage = (value) => {
    const {profileImage} = this.props;
    profileImage(value);
  }

  getSchool = (value) => {
    this.setState({school: value});

    const {school} = this.props;
    school(value);   
  }

  getIsAddedSchool = (value) => {
    this.setState({isAddedSchool: value});
    const {isAddedSchool} = this.props;
    isAddedSchool(value); 
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
                image={this.getImage}
                disableLoading
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
            <SchoolPicker
              variant="outlined"
              imageWidth = {this.props.imageWidth} 
              formWidth={this.props.formWidth}
              values={{
                school: this.props.values.school,
                isAddedSchool: this.props.values.isAddedSchool
              }}
              school={this.getSchool}
              isAddedSchool={this.getIsAddedSchool}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.nextFocus.removeFocus();
                }
              }}
            />
          </Box>,
        ]}
      />
    );
  }
}
