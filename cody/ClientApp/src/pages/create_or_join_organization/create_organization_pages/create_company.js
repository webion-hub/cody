import React from 'react';
import { CreateOrganizationBase } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_base/create_organization_base';

export function CreateCompany(props){
  return(
    <CreateOrganizationBase
      type="Company"
      errorLabel="Errore, Azienda già esistente!"
      nameLabel="Nome Azienda"
    />
  );
}