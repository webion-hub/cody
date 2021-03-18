import React from 'react';
import { CreateOrganizationBase } from '../components/create_organization_base/create_organization_base';

import { PageController } from 'src/lib/page_controller';


export const createTeamSettings = {
  component: CreateTeam,
  title: "Crea un team",
  width: 450,
  height: 598,
  href: "/organization#create",
  onBack: (e) => PageController.updateHash("create", e)
}

function CreateTeam(){
  return(
    <CreateOrganizationBase
      type="Team"
      errorLabel="Errore, Team già esistente!"
      nameLabel="Nome Team"
    />
  );
}

