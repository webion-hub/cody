import React, { Component } from 'react';

import { Box } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Badge } from '@material-ui/core';

import { ImageCropperDialog } from 'src/components/dialogs/image_cropper_dialog';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

export class AddPhoto extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      image: null,

      openEditDialog: false,
      croppedImage: this.props.value? this.props.value : null,
    }
  }

  resetImage = () => {
    this.setState({image: this.props.value});
    const {image} = this.props;
    image(this.props.value);
  }

  deleteImage = () => {
    this.setState({croppedImage: null});
    const {image} = this.props;
    image(null);
  };

  handleCloseEditDialog = () => {
    this.setState({openEditDialog: false});
  }

  
  getCroppedImage = (value) => {
    this.setState({croppedImage: value})
    const {image} = this.props;
    image(value); 
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  fileSelectedHandler = (event) => {
    let file = event.target.files[0];
    if(event.target.files[0] !== null){ 
      let reader = new FileReader();
  
      reader.onloadend = () => {
        this.setState({
          image: reader.result,
          openEditDialog: true
        });
      }
  
      reader.readAsDataURL(file);
    }

    event.target.value = null; //reset input file
  }

  render(){
    const badgeContent = (
      <div>
        {
          this.state.croppedImage? (
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
      </div>
    )

    const editableBadgeContent = (
      <div>
        <Fab 
          component="label"
          color="primary"
          style={{
            width: this.props.iconSize,
            height: this.props.iconSize
          }}
        >
          <EditRoundedIcon />
          <input
            type="file"
            accept="image/*"
            onChange={this.fileSelectedHandler}
            hidden
          />
        </Fab>
      </div>
    )

    return (
      <Box>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={this.props.accountEdit ? editableBadgeContent : badgeContent}
        >
          <Avatar 
            alt="add profile image" 
            src={this.state.croppedImage}
            style={{
              width: this.props.size,
              height: this.props.size
            }}
          />
        </Badge>
        <ImageCropperDialog
          open={this.state.openEditDialog}
          handleClose={this.handleCloseEditDialog}
          image={this.state.image}
          croppedImage={this.getCroppedImage}
        />
      </Box>
    )
  }
}