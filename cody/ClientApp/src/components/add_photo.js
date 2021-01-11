import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Fab } from '@material-ui/core';

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

export class AddPhoto extends Component{

  constructor(props){
    super(props);

    this.state = {
      image: null,
    }
  }

  deleteImage = () => {
    this.setState({image: null});    
    const {image} = this.props;
    image(null);
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   */
  fileSelectedHandler = (event) => {
    this.setState({image: event.target.files[0]});
    const {image} = this.props;
    image(event.target.files[0]); 
  }

  render(){
    const iconSize = this.props.iconSize;
    const boxSize = this.props.size;
    const margin = (boxSize - iconSize) / 16

    return (
      <Box 
        style={{
          backgroundColor: "rgba(0,0,0,0.2)"
        }}
        boxShadow={3}
        width={boxSize}
        height={boxSize}
        borderRadius={boxSize / 2}
      >
        <Grid
          container
          justify="flex-end"
        >
          {
            this.state.image? (
              <img 
                src={URL.createObjectURL(this.state.image)} 
                alt={this.state.image.name}
                style={{
                  width: boxSize,
                  height: boxSize,
                  overflow: "hidden",
                  objectFit: "cover",
                  borderRadius: boxSize / 2,
                }}                
              />
            ) : null
          }

          <Box
            position="absolute"
            style={{
              transform: "translate(8px, 8px)"
            }}
            mt={(this.props.size - 56) / 8}
          >
            {
              this.state.image? (
                <Fab 
                  color="primary"
                  onClick={this.deleteImage}
                >     
                  <DeleteRoundedIcon />          
                </Fab>
              ):(
                <Fab 
                  component="label"
                  color="primary"
                >     
                  <AddRoundedIcon />          
                  <input
                    type="file"
                    accept="image/*"
                    onChange={this.fileSelectedHandler}
                    hidden
                  />
                </Fab>
              )
            }

          </Box>
        </Grid>
        <Grid
          container
          justify="center"
        >
          {
            this.state.image? (
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
    )
  }
}

