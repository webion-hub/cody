import React, { useEffect } from 'react';

import { Fab } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ImageCropperDialog } from 'src/components/dialogs/image_cropper_dialog';
import { ImageOrientation } from 'src/lib/image_orientation';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { CustomAvatar } from '../custom_avatar';

export function AddPhoto(props){
  const [image, setImage] = React.useState(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [croppedImage, setCroppedImage] = React.useState(props.value);

  const theme = useTheme();  
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const iconSize = props.iconSize? 
    props.iconSize : 40;
    
  const responsiveDefaultImageSize = mobileView ? 75 : 100;
  const imageSize = props.imageSize? props.imageSize : responsiveDefaultImageSize;

  useEffect(() => {
    setCroppedImage(props.value)
  }, [props.value])

  const resetImage = () => {
    setImage(props.value);
    const {image} = props;
    image(props.value);
  }

  const deleteImage = () => {
    setCroppedImage(null);
    const {image} = props;
    image(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  }

  
  const getCroppedImage = (value) => {
    setCroppedImage(value)
    const {image} = props;
    image(value); 
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
   const fileSelectedHandler = (event) => {
    let file = event.target.files[0];
    if(event.target.files[0] !== null){ 
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

  const badgeContent = (
    <div>
      {
        croppedImage? (
          <Fab 
            color="primary"
            onClick={deleteImage}
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
              onChange={fileSelectedHandler}
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
          onChange={fileSelectedHandler}
          hidden
        />
      </Fab>
    </div>
  )

  return (
    <>    
      <Badge
        className={props.className}
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={props.accountEdit ? editableBadgeContent : badgeContent}
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