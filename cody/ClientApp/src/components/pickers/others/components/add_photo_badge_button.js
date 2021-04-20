import React from 'react';

import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { ImageUploader } from './image_uploader';

const useStyles = makeStyles((theme) => ({
  fab: props => ({
    width: props.iconSize,
    height: props.iconSize
  }),
}));

export function AddPhotoBadgeButton(props){
  const onDelete = props.onDelete;
  const onImageChange = props.onImageChange;
  const imageUnderEditing = props.imageUnderEditing;
  const thereIsAnImage = props.thereIsAnImage;

  const iconSize = props.iconSize;
  const classes = useStyles({iconSize});
  
  const deleteImageButton =
  <Fab 
    color="primary"
    onClick={onDelete}
    className={classes.fab}
  >
    <DeleteRoundedIcon />
  </Fab>
  
  const addImageButton = 
  <Fab 
    component="label"
    color="primary"
    className={classes.fab}
  >
    <AddRoundedIcon />
    <input
      type="file"
      accept="image/*"
      onChange={onImageChange}
      hidden
    />
  </Fab>
  
  const editableBadgeContent =
  <Fab 
    component="label"
    color="primary"
    className={classes.fab}
  >
    <EditRoundedIcon />
    <ImageUploader
      onImageChange={onImageChange}
    />
  </Fab>


  if(imageUnderEditing)
    return editableBadgeContent;
  if(thereIsAnImage)
    return deleteImageButton;

  return addImageButton;    
}

AddPhotoBadgeButton.defaultProps = {
  iconSize : 40
}


