import React from 'react';
import { CreateOrganizationBase } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_base/create_organization_base';

export function CreateTeam(props){
  return(
    <CreateOrganizationBase
      type="Team"
      errorLabel="Errore, Team già esistente!"
      nameLabel="Nome Team"
    />
  );
}