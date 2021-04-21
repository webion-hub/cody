import React, { useEffect } from 'react';

import { Grid, IconButton } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import { useAddPhoto } from './hooks/use_add_photo';
import { ImageUploader } from './components/image_uploader';
import { ImageCropperDialog } from 'src/components/dialogs/image_cropper_dialog';
import { makeStyles } from '@material-ui/core/styles';
import { setOpacityColor } from 'src/lib/setOpacityColor';

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative"
  },
  overlay: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    opacity: 0,
    background: setOpacityColor(theme.palette.secondary.main, 0.25),
    backdropFilter: "blur(10px)",
    "&:hover": {
      opacity: 1,
    },
    transition: "0.25s all" 
  },
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
  const [imageLoading, setImageLoading] = React.useState(true);
  const [notImage, setNotImage] = React.useState(false);
   
  const {
    getImageUploaded,
    setCroppedImage,
    deleteImage,
    image,
    uploadedImage
  } = useAddPhoto(props.src)

  useEffect(_=> {
    if(image === null){
      props.onImageDelete?.()
      return;
    }

    if(image !== props.src)
      props.onImageChange?.(image);



  },[image])

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

  const imageComponent = React.Children.map(props.children, child =>
    React.cloneElement(child, { 
      src: image,
      loading: child.props.loading || props.loading,
      onLoadEnd: _=> setImageLoading(false),
      onError: _=> setNotImage(true)
    }),
  );

  if(props.disabled || props.loading || imageLoading)
    return imageComponent

  return (
    <div className={classes.container}>
      <Grid
        className={`${classes.overlay} ${props.className ? props.className : ""}`}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
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
          onClick={handleDeleteImage}
        >
          <DeleteRoundedIcon className={notImage ? classes.disabledIcon : classes.icon}/>
        </IconButton>
      </Grid>
      <ImageCropperDialog
        aspect={props.aspect}
        maxSize={props.maxSize}
        cropShape={props.cropShape}
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        image={uploadedImage}
        onCroppedImage={handleCroppedImage}
      />
      {imageComponent}
    </div>
  )
}