import React from 'react';

import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

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

  const iconSize = props.iconSize? props.iconSize : 40;
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
    <input
      type="file"
      accept="image/*"
      onChange={onImageChange}
      hidden
    />
  </Fab>

  const getBadgeButton = () => {
    if(imageUnderEditing)
      return editableBadgeContent;
    if(thereIsAnImage)
      return deleteImageButton;
    else
      return addImageButton;      
  }

  return getBadgeButton()

}

