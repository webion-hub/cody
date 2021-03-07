import React, { useEffect } from 'react';

import { BackgroundWithLines } from 'src/components/background_with_lines';

import { OrganizationsInfo } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organizations_info';

import { SelectAction } from 'src/pages/create_or_join_organization/select_action';
import { CreateOrganization } from 'src/pages/create_or_join_organization/create_organization/create_organization';
import { CreateTeam } from 'src/pages/create_or_join_organization/create_organization/create_team';
import { JoinOrganization } from 'src/pages/create_or_join_organization/join_organization';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';

import { PageController } from 'src/lib/page_controller';
import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base';

export function CreateOrJoinOrganization(){
  const infoRef = React.createRef();

  const [contentSetting, setContentSetting] = React.useState({
    component: "selectAction",
    title: "Unisciti o crea un'organizzazione",
    width: 750,
    height: 400,
    onBack: null
  });

  useEffect(() => {
    const hash = window.location.hash
    const value = hash.replace('#', '')

    setContent(value)
  }, [window.location.hash])


  const components = {
    createOrganization:
      <CreateOrganization/>
    , 
    createTeam:
      <CreateTeam/>  
    ,
    joinOrganization:
      <JoinOrganization
        onBack={() => PageController.updateHash("")}
        infoRef={infoRef}    
      />
    ,
    selectAction:
      <SelectAction
        onCreate={() => PageController.updateHash("create")}
        onJoin={() => PageController.updateHash("join")}
        infoRef={infoRef}
      />
  }




  const setContent = (hash) => {
    switch(hash){
      case "create":
        setContentSetting({
          component: "createOrganization",
          title: "Crea un'organizzazione",
          width: 1125,
          height: 400,
          onBack: () => PageController.updateHash("")
        })
        break;
      case "createTeam":
        setContentSetting({
          component: "createTeam",
          title: "Crea un team",
          width: 750,
          height: 400,
          onBack: () => PageController.updateHash("create")
        })
        break;
      case "createSchool":
        break;
      case "createCompany":
        break;
      case "join":
        setContentSetting({
          component: "joinOrganization",
          title: "Crea un'organizzazione",
          width: 690,
          height: 400,
          onBack: () => PageController.updateHash("")
        })
        break;
      default:
        setContentSetting({
          component: "selectAction",
          title: "Unisciti o crea un'organizzazione",
          width: 750,
          height: 400,
          onBack: null
        })
    }  
  }

  return(
    <>
      <CenterComponentPageBase>
        <TitleInfoContentBase
          title={contentSetting.title}
          width={contentSetting.width}
          height={contentSetting.height}
          onBack={contentSetting.onBack}
          infoRef={infoRef}
        >
          {components[contentSetting.component]}
        </TitleInfoContentBase>
        <BackgroundWithLines 
          height={1}
        /> 
      </CenterComponentPageBase>
      <div ref={infoRef}>
        <OrganizationsInfo/>
      </div>
    </>
  );
}