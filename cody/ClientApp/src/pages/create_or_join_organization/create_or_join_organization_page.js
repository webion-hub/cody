import React, { useEffect } from 'react';

import { BackgroundWithLines } from 'src/components/background_with_lines/background_with_lines';

import { OrganizationsInfo } from 'src/pages/create_or_join_organization/components/organizations_info';
import { selectActionSettings } from 'src/pages/create_or_join_organization/pages/select_action/select_action';

import { createOrganizationSettings } from 'src/pages/create_or_join_organization/pages/create/create_organization';
import { createTeamSettings } from 'src/pages/create_or_join_organization/pages/create/pages/create_team';
import { createSchoolSettings } from 'src/pages/create_or_join_organization/pages/create/pages/create_school';
import { createCompanySettings } from 'src/pages/create_or_join_organization/pages/create/pages/create_company';

import { joinOrganizationSettings } from 'src/pages/create_or_join_organization/pages/join/join_organization';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';

import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base';


export function CreateOrJoinOrganization(){
  const infoRef = React.createRef();
  const [contentSetting, setContentSetting] = React.useState(selectActionSettings);

  useEffect(() => {
    const hash = window.location.hash
    const value = hash.replace('#', '')

    setContentByHash(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.hash])

  const setContentByHash = (hash) => {
    const action = {
      'create': () => setContentSetting(createOrganizationSettings),
      'createteam': () => setContentSetting(createTeamSettings),
      'createschool': () => setContentSetting(createSchoolSettings),
      'createcompany': () => setContentSetting(createCompanySettings),
      'join': () => setContentSetting(joinOrganizationSettings),
    }[hash];

    action ? 
      action() : setContentSetting(selectActionSettings); 
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