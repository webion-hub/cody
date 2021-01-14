import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

const LargeAvatar = withStyles({
  root: {
    width: 120,
    height: 120,
  },
})(Avatar);

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
    const iconSize = this.props.iconSize;
    const boxSize = this.props.size;
    const margin = (boxSize - iconSize) / 16

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
        >
          <LargeAvatar alt="add profile image" src={this.state.image}/>
        </Badge>
      </Box>
    )
  }
}

