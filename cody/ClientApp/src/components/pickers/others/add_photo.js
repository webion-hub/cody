import React, { useEffect } from 'react';

import { Badge } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ImageCropperDialog } from 'src/components/dialogs/image_cropper_dialog';
import { AddPhotoBadgeButton } from './components/add_photo_badge_button';
import { CustomAvatar } from '../../custom_avatar';

import { ImageOrientation } from 'src/lib/image_orientation';

export function AddPhoto(props){
  const [image, setImage] = React.useState(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [croppedImage, setCroppedImage] = React.useState(props.value);

  const theme = useTheme();  
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
   
  const responsiveDefaultImageSize = mobileView ? 75 : 100;
  const imageSize = props.imageSize? props.imageSize : responsiveDefaultImageSize;

  useEffect(() => {
    setCroppedImage(props.value)
  }, [props.value])

  const deleteImage = () => {
    setCroppedImage(null);
    const {onImageChange} = props;
    onImageChange(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  }

  
  const getCroppedImage = (value) => {
    setCroppedImage(value)
    const {onImageChange} = props;
    onImageChange(value); 
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
   const fileSelectedHandler = (event) => {
    let file = event.target.files[0];
    if(file !== null){ 
      const imageOrientation = new ImageOrientation()

      imageOrientation.
        fixOrientation(file)
        .then(blob => {
          setImage(blob);
          setOpenEditDialog(true);
        })
    }

    event.target.value = null; //reset input file
  }

  const badgeContent = 
    <AddPhotoBadgeButton
      imageUnderEditing={props.accountEdit}
      thereIsAnImage={croppedImage}
      iconSize={props.iconSize}
      onDelete={deleteImage}
      onImageChange={fileSelectedHandler}
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
          src={croppedImage}
          size={imageSize}
        />
      </Badge>
      <ImageCropperDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        image={image}
        croppedImage={getCroppedImage}
      />
    </>
  )
}