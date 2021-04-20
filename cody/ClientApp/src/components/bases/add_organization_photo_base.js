import React from "react";

import OrganizationImages from 'src/lib/server_calls/organization_images';
import { AddPhotoOverlay } from "src/components/pickers/others/add_photo_overlay";

export function AddOrganizationPhotoBase(props){
  const { 
    id, 
    callerIs, 
    className, 
    type, 
    loading,
    ...other
  } = props
  const canNotUserEdit = !(callerIs === "Admin" || callerIs === "Owner")

  const handleImageChange = (image) => {
    OrganizationImages
      .of(id)
      .update(type, image)
  }

  const handleImageDelete = () => {
    OrganizationImages
      .of(id)
      .delete(type)
  }

  return (
    <AddPhotoOverlay
      {...other}
      loading={loading}
      disabled={canNotUserEdit}
      className={className}
      src={`organizations/${id}/${type}`}
      onImageChange={handleImageChange}
      onImageDelete={handleImageDelete}
    >
      {props.children}
    </AddPhotoOverlay>
  )
}