import React, { useEffect } from 'react';

import { BackgroundWithLines } from 'src/components/background_with_lines/background_with_lines';

import { selectActionSettings } from 'src/pages/create_or_join_organization/pages/select_action/select_action';

import { createOrganizationSettings } from 'src/pages/create_or_join_organization/pages/create/create_organization';
import { createTeamSettings } from 'src/pages/create_or_join_organization/pages/create/pages/create_team';
import { createSchoolSettings } from 'src/pages/create_or_join_organization/pages/create/pages/create_school';
import { createCompanySettings } from 'src/pages/create_or_join_organization/pages/create/pages/create_company';
import { useOrganizationsInfoSettings } from 'src/pages/create_or_join_organization/pages/info/organizations_info';

import { joinOrganizationSettings } from 'src/pages/create_or_join_organization/pages/join/join_organization';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';

import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base/title_info_content_base';

import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { LoginDialog } from 'src/components/dialogs/login_dialog';


export default function CreateOrJoinOrganization(){
  const [contentSetting, setContentSetting] = React.useState(selectActionSettings);
  const [loginDialog, setLoginDialog] = React.useState(false);
  const organizationsInfoSettings = useOrganizationsInfoSettings()
  const { userState } = React.useContext(UserContext);

  useEffect(() => {
    const hash = window.location.hash
    const hashValue = hash.replace('#', '')
    const isNotLogged = userState === "notLogged"
    const wrongHashForNotLoggedUser = hashValue !== '' && hashValue !== 'info'

    if(wrongHashForNotLoggedUser && isNotLogged){
      setLoginDialog(true)
      window.location.hash = '';
      return;
    }


    setContentByHash(hashValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.hash])

  const setContentByHash = (hash) => {
    const action = {
      'create': () => setContentSetting(createOrganizationSettings),
      'createteam': () => setContentSetting(createTeamSettings),
      'createschool': () => setContentSetting(createSchoolSettings),
      'createcompany': () => setContentSetting(createCompanySettings),
      'join': () => setContentSetting(joinOrganizationSettings),
      'info': () => setContentSetting(organizationsInfoSettings),
    }[hash];

    action ? 
      action() : setContentSetting(selectActionSettings); 
  }

  return(
    <CenterComponentPageBase>
      <TitleInfoContentBase
        {...contentSetting}
      >
        <contentSetting.component/>
      </TitleInfoContentBase>
      <BackgroundWithLines/> 
      <LoginDialog
        open={loginDialog}
        onClose={() => setLoginDialog(false)}
        onSuccess={() => setLoginDialog(false)}
      />
    </CenterComponentPageBase>
  );
}