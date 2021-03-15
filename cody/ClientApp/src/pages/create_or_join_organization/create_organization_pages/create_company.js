import React from 'react';
import { CreateOrganizationBase } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_base/create_organization_base';

import { PageController } from 'src/lib/page_controller';


export const createCompanySettings = {
  component: CreateCompany,
  title: "Aggiungi un' Azienda",
  width: 450,
  height: 654,
  href: "/organization#create",
  onBack: (e) => PageController.updateHash("create", e)
}

function CreateCompany(props){
  return(
    <CreateOrganizationBase
      type="Company"
      errorLabel="Errore, Azienda già esistente!"
      nameLabel="Nome Azienda"
    />
  );
}