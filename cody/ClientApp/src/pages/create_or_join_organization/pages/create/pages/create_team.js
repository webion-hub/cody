import React from 'react';
import { CreateOrganizationBase } from '../components/create_organization_base/create_organization_base';

export const createTeamSettings = {
  component: CreateTeam,
  title: "Crea un team",
  width: 450,
  height: 598,
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

