import React, { useEffect } from 'react';

import { Badge } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ImageCropperDialog } from 'src/components/dialogs/image_cropper_dialog';
import { AddPhotoBadgeButton } from './components/add_photo_badge_button';
import { CustomAvatar } from '../../custom_avatar';

import { useAddPhoto } from './hooks/use_add_photo';

export function AddPhoto(props){
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const theme = useTheme();  
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
   
  const responsiveDefaultImageSize = mobileView ? 75 : 100;
  const imageSize = props.imageSize? props.imageSize : responsiveDefaultImageSize;

  const {
    getImageUploaded,
    setCroppedImage,
    deleteImage,
    image,
    uploadedImage
  } = useAddPhoto(props.src)

  useEffect(_=> {
    props.onImageChange?.(image);
  },[image])

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  }

  const handleImageUpload = async (event) => {
    await getImageUploaded(event)
    setOpenEditDialog(true);
  }

  const badgeContent = 
    <AddPhotoBadgeButton
      imageUnderEditing={props.accountEdit}
      thereIsAnImage={image}
      iconSize={props.iconSize}
      onDelete={deleteImage}
      onImageChange={handleImageUpload}
    />

  return (
    <>    
      <Badge
        className={props.className}
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={badgeContent}
      >
        <CustomAvatar
          disableLoading={props.disableLoading}
          alt={props.alt}
          src={image}
          size={imageSize}
        />
      </Badge>
      <ImageCropperDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        image={uploadedImage}
        onCroppedImage={setCroppedImage}
      />
    </>
  )
}