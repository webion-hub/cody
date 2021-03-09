import React, { useEffect } from 'react';

import { BackgroundWithLines } from 'src/components/background_with_lines';

import { OrganizationsInfo } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organizations_info';

import { SelectAction } from 'src/pages/create_or_join_organization/select_action';
import { CreateOrganization } from 'src/pages/create_or_join_organization/create_organization/create_organization';
import { CreateTeam } from 'src/pages/create_or_join_organization/create_organization/create_team';
import { CreateSchool } from 'src/pages/create_or_join_organization/create_organization/create_school';
import { CreateCompany } from 'src/pages/create_or_join_organization/create_organization/create_company';
import { JoinOrganization } from 'src/pages/create_or_join_organization/join_organization/join_organization';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';

import { PageController } from 'src/lib/page_controller';
import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base';

export function CreateOrJoinOrganization(){
  const infoRef = React.createRef();

  const [contentSetting, setContentSetting] = React.useState({
    component: SelectAction,
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

  const setContent = (hash) => {
    switch(hash){
      case "create":
        setContentSetting({
          component: CreateOrganization,
          title: "Crea un'organizzazione",
          width: 450,
          height: 468,
          href: "/organization",
          onBack: (e) => PageController.updateHash("", e)
        })
        break;
      case "createteam":
        setContentSetting({
          component: CreateTeam,
          title: "Crea un team",
          width: 450,
          height: 468,
          href: "/organization#create",
          onBack: (e) => PageController.updateHash("create", e)
        })
        break;
      case "createschool":
        setContentSetting({
          component: CreateSchool,
          title: "Aggiungi un Istituto",
          width: 450,
          height: 603,
          href: "/organization#create",
          onBack: (e) => PageController.updateHash("create", e)
        })
        break;
      case "createcompany":
        setContentSetting({
          component: CreateCompany,
          title: "Aggiungi un' Azienda",
          width: 450,
          height: 603,
          href: "/organization#create",
          onBack: (e) => PageController.updateHash("create", e)
        })
        break;
      case "join":
        setContentSetting({
          component: JoinOrganization,
          title: "Unisciti ad un'organizzazione",
          width: 750,
          height: 400,
          href: "/organization",
          onBack: (e) => PageController.updateHash("", e)
        })
        break;
      default:
        setContentSetting({
          component: SelectAction,
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
          href={contentSetting.href}
          onBack={contentSetting.onBack}
          infoRef={infoRef}
        >
          <contentSetting.component/>
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