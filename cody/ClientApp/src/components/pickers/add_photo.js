import React, { Component } from 'react';

import { Box } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

export class AddPhoto extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      image: this.props.value? this.props.value : null,
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
    let file = event.target.files[0];
    const {image} = this.props;
    image(event.target.files[0]); 

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        image: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render(){
    return (
      <Box>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={
            this.state.image? (
              <Fab 
                color="primary"
                onClick={this.deleteImage}
                style={{
                  width: this.props.iconSize,
                  height: this.props.iconSize
                }}
              >
                <DeleteRoundedIcon />
              </Fab>
            ):(
              <Fab 
                component="label"
                color="primary"
                style={{
                  width: this.props.iconSize,
                  height: this.props.iconSize
                }}
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
        >
          <Avatar 
            alt="add profile image" 
            src={this.state.image}
            style={{
              width: this.props.size,
              height: this.props.size
            }}
          />
        </Badge>
      </Box>
    )
  }
}

