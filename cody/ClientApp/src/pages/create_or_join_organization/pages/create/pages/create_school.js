import { CreateOrganizationBase } from '../components/create_organization_base/create_organization_base';

export const createSchoolSettings = {
  title: "Aggiungi un Istituto",
  width: 450,
  height: 670,
}

export default function CreateSchool(){
  return(
    <CreateOrganizationBase
      type="School"
      errorLabel="Errore, Scuola già esistente!"
      nameLabel="Nome Scuola"
    />
  );
}

