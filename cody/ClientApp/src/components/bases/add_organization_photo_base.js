import React from "react";

import OrganizationImages from 'src/lib/server_calls/organization_images';
import { AddPhotoOverlay } from "src/components/pickers/others/add_photo_overlay";
import { EventsDispatcher } from "src/lib/events_dispatcher";

export function AddOrganizationPhotoBase(props){
  const { 
    id, 
    callerIs, 
    type, 
    loading,
    ...other
  } = props
  
  const canNotUserEdit = !(callerIs === "Admin" || callerIs === "Owner")
  const organizationImages = OrganizationImages.of(id);

  const updateOrganization = () => {
    EventsDispatcher
      .setEvent('updateBookmarkedOrganizations')
      .update()
  }

  const handleImageChange = (image) => {
    organizationImages
      .update(type, image)
      .then(updateOrganization)
  }

  const handleImageDelete = () => {
    organizationImages
      .delete(type)
      .then(updateOrganization)
  }

  return (
    <AddPhotoOverlay
      {...other}
      loading={loading}
      disabled={canNotUserEdit}
      src={organizationImages.url`/${type}`}
      onImageChange={handleImageChange}
      onImageDelete={handleImageDelete}
    >
      {props.children}
    </AddPhotoOverlay>
  )
}