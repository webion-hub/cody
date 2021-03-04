import React from 'react';

import { BackgroundWithLines } from 'src/components/background_with_lines';

import { OrganizationsInfo } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organizations_info';
import { SelectAction } from 'src/pages/create_or_join_organization/select_action';
import { CreateOrganization } from 'src/pages/create_or_join_organization/create_organization_page';

export function CreateOrJoinOrganization(){
  const [content, setContent] = React.useState("selectAction");

  const selectAction = 
    <SelectAction
      onCreate={() => setContent("create")}
      onJoin={() => setContent("join")}
      info={<OrganizationsInfo/>}
    />
  
  const createOrganization = 
    <CreateOrganization
      onBack={() => setContent("selectAction")}
      info={<OrganizationsInfo/>}    
    />

  const getContent = () => {
    switch(content){
      case "create":
        return createOrganization;
      case "join":
        return selectAction;
      case "selectAction":
      default:
        return selectAction;
    }  
  }

  return(
    <>
      {getContent()}
      <BackgroundWithLines 
        height={1}
      /> 
    </>
  );
}