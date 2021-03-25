import React from 'react';
import { CreateOrganizationBase } from '../components/create_organization_base/create_organization_base';

export const createSchoolSettings = {
  component: CreateSchool,
  title: "Aggiungi un Istituto",
  width: 450,
  height: 670,
}

function CreateSchool(){
  return(
    <CreateOrganizationBase
      type="School"
      errorLabel="Errore, Scuola già esistente!"
      nameLabel="Nome Scuola"
    />
  );
}

