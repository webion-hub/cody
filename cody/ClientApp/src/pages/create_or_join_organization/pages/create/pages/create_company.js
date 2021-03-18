import React from 'react';
import { CreateOrganizationBase } from '../components/create_organization_base/create_organization_base';

import { PageController } from 'src/lib/page_controller';


export const createCompanySettings = {
  component: CreateCompany,
  title: "Aggiungi un' Azienda",
  width: 450,
  height: 670,
  href: "/organization#create",
  onBack: (e) => PageController.updateHash("create", e)
}

function CreateCompany(){
  return(
    <CreateOrganizationBase
      type="Company"
      errorLabel="Errore, Azienda già esistente!"
      nameLabel="Nome Azienda"
    />
  );
}