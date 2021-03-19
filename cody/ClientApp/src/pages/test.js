import React from 'react';
import { CustomAvatar } from 'src/components/custom_avatar';
import OrganizationImages from 'src/lib/organization_images';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';
import { Button, TextField } from '@material-ui/core';
import { AddPhoto } from 'src/components/pickers/others/add_photo';

export function Test() {
  const [id, setId] = React.useState(null)
  const [image, setImage] = React.useState("")
  
  return (
    <CenterComponentPageBase>
      <AddPhoto
        image={(val) => setImage(val)}
      />
      <CustomAvatar
        src={`organizations/${id}/logo`}
      />
      <TextField
        label="id"
        onChange={(event) => setId(event.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          OrganizationImages
            .of(id)
            .update('logo', image)
        }}
      >
        Imposta immagine
      </Button>
    </CenterComponentPageBase>
  );
}