import React from 'react';
import { CreateOrganizationBase } from 
  'src/pages/create_or_join_organization/create_or_join_organization_components/create_organization/create_organization_base/create_organization_base';

import { PageController } from 'src/lib/page_controller';


export const createSchoolSettings = {
  component: CreateSchool,
  title: "Aggiungi un Istituto",
  width: 450,
  height: 654,
  href: "/organization#create",
  onBack: (e) => PageController.updateHash("create", e)
}

function CreateSchool(props){
  return(
    <CreateOrganizationBase
      type="School"
      errorLabel="Errore, Scuola già esistente!"
      nameLabel="Nome Scuola"
    />
  );
}

