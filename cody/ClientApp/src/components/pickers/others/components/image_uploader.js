import React from 'react';

export function ImageUploader(props){
  const onImageChange = props.onImageChange;
  
  return (
    <input
      type="file"
      accept="image/*"
      onChange={onImageChange}
      hidden
    />
  )
}
