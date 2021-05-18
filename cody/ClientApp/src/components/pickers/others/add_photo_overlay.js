import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import { useAddPhoto } from './hooks/use_add_photo';
import { ImageUploader } from './components/image_uploader';
import { ImageCropperDialog } from 'src/components/dialogs/image_cropper_dialog';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteImageDialog } from './components/delete_image_dialog';
import { ImageWithOverlay } from 'src/components/image_with_overlay';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "rgba(255,255,255,1)"
  },
  disabledIcon: {
    color: "rgba(255,255,255,0.5)"
  }
}));

export function AddPhotoOverlay(props){
  const classes = useStyles()
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [notImage, setNotImage] = React.useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
   
  const {
    getImageUploaded,
    setCroppedImage,
    deleteImage,
    image,
    uploadedImage
  } = useAddPhoto(props.src)

  useEffect(_=> {
    handleOnImageDelete()
    handleOnImageChange()
  },[image])

  const handleOnImageChange = async () => {
    if(image === null)
      return;
    if(image === props.src)
      return;

    setLoading(true)
    await props.onImageChange?.(image);
    setLoading(false)
  }

  const handleOnImageDelete = async () => {
    if(image !== null)
      return;

    setLoading(true)
    await props.onImageDelete?.()
    setLoading(false)
    setOpenDeleteDialog(false)
  }


    
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  }

  const handleImageUpload = async (event) => {
    await getImageUploaded(event)
    setOpenEditDialog(true);
  }

  const handleCroppedImage = async (image) => {
    await setCroppedImage(image)
    setNotImage(false)
  }

  const handleDeleteImage = async () => {
    await deleteImage()
    setNotImage(true)
  }

  const finalLoading = props.loading || loading

  const imageComponent = React.Children.map(props.children, child =>
    React.cloneElement(child, { 
      src: image,
      loading: child.props.loading || finalLoading,
      onError: _=> setNotImage(true),
      onLoad: _=> setNotImage(false)
    }),
  );

  if(props.disabled || finalLoading)
    return imageComponent

  return (
    <ImageWithOverlay
      showOverlay={notImage && props.showOverlay}
      className={props.className}
      cropShape={props.cropShape}
      overlayContent={
        <>
          <IconButton
            component="label"
          >
            <ImageUploader
              onImageChange={handleImageUpload}
            />
            <AddRoundedIcon className={classes.icon}/>
          </IconButton>
          <IconButton
            disabled={notImage}
            onClick={_ => setOpenDeleteDialog(true)}
          >
            <DeleteRoundedIcon className={notImage ? classes.disabledIcon : classes.icon}/>
          </IconButton>
        </>
      }
    >
      {imageComponent}
      <ImageCropperDialog
        aspect={props.aspect}
        maxSize={props.maxSize}
        cropShape={props.cropShape}
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        image={uploadedImage}
        onCroppedImage={handleCroppedImage}
      />
      <DeleteImageDialog
        open={openDeleteDialog}
        onImageDelete={handleDeleteImage}
        onClose={_ => setOpenDeleteDialog(false)}
      />
    </ImageWithOverlay>
  )
}