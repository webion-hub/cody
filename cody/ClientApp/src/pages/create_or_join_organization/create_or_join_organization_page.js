import React, { useEffect } from 'react';

import { BackgroundWithLines } from 'src/components/background_with_lines';

import { OrganizationsInfo } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organizations_info';

import { selectActionSettings } from 'src/pages/create_or_join_organization/select_action';

import { createOrganizationSettings } from 'src/pages/create_or_join_organization/create_organization_pages/create_organization';
import { createTeamSettings } from 'src/pages/create_or_join_organization/create_organization_pages/create_team';
import { createSchoolSettings } from 'src/pages/create_or_join_organization/create_organization_pages/create_school';
import { createCompanySettings } from 'src/pages/create_or_join_organization/create_organization_pages/create_company';

import { joinOrganizationSettings } from 'src/pages/create_or_join_organization/join_organization';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';

import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base';

export function CreateOrJoinOrganization(){
  const infoRef = React.createRef();

  const [contentSetting, setContentSetting] = React.useState(selectActionSettings);

  useEffect(() => {
    const hash = window.location.hash
    const value = hash.replace('#', '')

    setContent(value)
  }, [window.location.hash])

  const setContent = (hash) => {
    switch(hash){
      case "create":
        setContentSetting(createOrganizationSettings)
        break;
      case "createteam":
        setContentSetting(createTeamSettings)
        break;
      case "createschool":
        setContentSetting(createSchoolSettings)
        break;
      case "createcompany":
        setContentSetting(createCompanySettings)
        break;
      case "join":
        setContentSetting(joinOrganizationSettings)
        break;
      default:
        setContentSetting(selectActionSettings)
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