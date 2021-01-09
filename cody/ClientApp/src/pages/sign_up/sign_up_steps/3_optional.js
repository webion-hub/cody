
import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Link } from '@material-ui/core';

import { SignUpBase } from '../sign_up_components/sign_up_base'
import { AddSchoolDialog } from '../sign_up_components/add_school_dialog'
import { AddPhoto } from '../../../components/add_photo';
import { Colors } from '../../../index'
import { NextFocus } from '../../../lib/next_focus';
import { School } from '../../../lib/school';

import { Step3 } from '../../../components/illustrations/step3';

export class OptionalData extends Component{
  constructor(props){
    super(props);
    this.handleOpen = this.handleOpen.bind(this);    
    this.getSchool = this.getSchool.bind(this);

    this.state = {
      open: false,
      schoolId: this.props.values.schoolId,
    }

    this.nextFocus = new NextFocus(["school"]);

    this.schoolsList = this.getSchoolsList();
    console.log(schoolsList);
  }

  async getSchoolsList(){
    let list = await School.getAll();
    console.log(list);
    return list;
  }


  handleOpen(value){
    this.setState({open: value});
  }

  getSchool(value){
    this.setState({schoolId: value.id});

    const {school} = this.props;
    school(value.id);
  } 

  render(){
    return (
      <SignUpBase
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
                  />
                  <Box
                    mt={2}
                  >
                    <Typography
                      variant="subtitle1"
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
              onChange={(event, value) => this.getSchool(value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.nextFocus.removeFocus();
                }              
             }}  
              options={schoolsList}
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
              style={{ width: 300 }}
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
            <Link
              style={{
                fontSize: 12,
                color: Colors.lightGrey
              }}
              component="button"
              variant="caption"
              onClick={() => {
                this.handleOpen(true);
              }}
            >
              Non trovi il tuo Istituto? Aggiungilo
            </Link>
            <AddSchoolDialog
              open = {this.state.open}
              onClose = {this.handleOpen}
              imageWidth = {this.props.imageWidth} 
              formWidth={this.props.formWidth}
            />
          </Box>,
        ]}
      />
    );
  }
}


const schoolsList = [
  { 
    id: 1,
    name: "ITIS Fermi", 
    city: "Modena",
    country: "Italy" 
  },
  { 
    id: 2,
    name: "Unimore", 
    city: "Modena",
    country: "Italy" 
  },
  { 
    id: 3,
    name: "Unimi", 
    city: "Milano",
    country: "Italy" 
  },
  { 
    id: 4,
    name: "Politecnico Torino", 
    city: "Torino",
    country: "Italy" 
  },
  { 
    id: 5,
    name: "MIT", 
    city: "Boston",
    country: "Massachusetts" 
  },
];
