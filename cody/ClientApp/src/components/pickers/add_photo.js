import React, { Component } from 'react';

import { Box } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { ImageCropperDialog } from 'src/components/dialogs/image_cropper_dialog';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { CustomAvatar } from '../custom_avatar';

export class AddPhoto extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      image: null,
      loading: true,
      
      openEditDialog: false,
      croppedImage: this.props.value,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({croppedImage: this.props.value})
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
    const iconSize = 40;
    const imageSize = 100;

    const badgeContent = (
      <div>
        {
          this.state.croppedImage? (
            <Fab 
              color="primary"
              onClick={this.deleteImage}
              style={{
                width: iconSize,
                height: iconSize
              }}
            >
              <DeleteRoundedIcon />
            </Fab>
          ):(
            <Fab 
              component="label"
              color="primary"
              style={{
                width: iconSize,
                height: iconSize
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
            width: iconSize,
            height: iconSize
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
        {
          this.state.loading ? 
            <Skeleton
              variant="circle"
              animation="wave"
              width={imageSize}
              height={imageSize}
            />
            :
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={this.props.accountEdit ? editableBadgeContent : badgeContent}
            >
              <CustomAvatar
                alt={this.props.alt}
                src={this.state.croppedImage}
                style={{
                  width: imageSize,
                  height: imageSize
                }}
                onLoad={() => this.setState({loading: false})} 
                onError={() => this.setState({loading: false})}
              />
            </Badge>
        }
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