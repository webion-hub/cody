import React, { useEffect } from 'react';
import { ImageOrientation } from 'src/lib/image_orientation';

export function useAddPhoto(imageProps){
  const [image, setImage] = React.useState(imageProps);
  const [uploadedImage, setUploadedImage] = React.useState(null);

  useEffect(_=> {
    setImage(imageProps);
  },[imageProps])

  const deleteImage = () => {
    setImage(null)
  };

  const setCroppedImage = (value) => {
    setImage(value)
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
   const getImageUploaded = (event) => {
    let file = event.target.files[0];
    if(file !== null){ 
      const imageOrientation = new ImageOrientation()

      imageOrientation.
        fixOrientation(file)
        .then(setUploadedImage)
    }

    event.target.value = null; //reset input file
  }

  return {
    getImageUploaded,
    setCroppedImage,
    deleteImage,
    image,
    uploadedImage
  }
}