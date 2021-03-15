import React from 'react';
import { CreateOrganizationBase } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_base/create_organization_base';

export function CreateSchool(props){
  return(
    <CreateOrganizationBase
      type="School"
      errorLabel="Errore, Scuola già esistente!"
      nameLabel="Nome Scuola"
    />
  );
}