
import React from 'react';

import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { SignUpBase } from '../sign_up_base'
import { AddPhoto } from '../../../components/add_photo';
import { Colors } from '../../../index'

import { Step3 } from '../../../components/illustrations/step3';




export function OptionalDatas(props){
  return (
    <SignUpBase
      image={<Step3 size={props.imageWidth}/>}
      formWidth={props.formWidth}
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
                  image="https://personale.unimore.it/foto.aspx?id=724"
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
          <TextField
            id="school"
            label="Istituto"
            variant="outlined"
            color="secondary"
            fullWidth={true}
          />
        </Box>,
      ]}
    />
  );
}


