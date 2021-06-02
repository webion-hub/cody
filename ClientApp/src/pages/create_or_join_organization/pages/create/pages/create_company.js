import { CreateOrganizationBase } from '../components/create_organization_base/create_organization_base';

export const createCompanySettings = {
  title: "Aggiungi un' Azienda",
  width: 450,
  height: 670,
}

export default function CreateCompany(){
  return(
    <CreateOrganizationBase
      type="Company"
      errorLabel="Errore, Azienda già esistente!"
      nameLabel="Nome Azienda"
    />
  );
}