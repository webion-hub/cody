import React from 'react';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { Fab } from '@material-ui/core';

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

export function AddPhoto(props){

    const iconSize = props.iconSize;
    const boxSize = props.size;
    const margin = (boxSize - iconSize) / 16
  
    return (
      <Box 
        style={ 
          props.image ? {
              backgroundImage: `url(${props.image})`,
              backgroundPosition: "center",
              backgroundSize: props.size,
            } : {
              backgroundColor: "rgba(0,0,0,0.2)"
            }
        }
        boxShadow={3}
        width={boxSize}
        height={boxSize}
        borderRadius={boxSize / 2}
      >
        <Grid
          container
          justify="flex-end"
        >
          <Box
            position="absolute"
            style={{
              transform: "translate(8px, 8px)"
            }}
            mt={(props.size - 56) / 8}
          >
            <Fab color="primary" aria-label="add">
              {
                props.image ? (
                    <EditRoundedIcon/>
                  ) : (
                    <AddRoundedIcon />
                  )
                }
            </Fab>
          </Box>
        </Grid>
        <Grid
          container
          justify="center"
        >
          {
            props.image ? (
                <div></div>
              ) : (
                <Box
                  m={margin}
                >
                  <PersonRoundedIcon
                    style={{ fontSize: iconSize }}
                  />
                </Box>
              )
          }  
        </Grid>
      </Box>
    );
  }