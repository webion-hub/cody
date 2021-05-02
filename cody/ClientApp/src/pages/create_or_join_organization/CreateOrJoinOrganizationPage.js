import React, { useEffect } from 'react';

import { BackgroundWithLines } from 'src/components/background_with_lines/background_with_lines';
import { CenterComponentPageBase } from 'src/components/bases/center_component_page_base';
import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base/title_info_content_base';

import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { EventsDispatcher } from 'src/lib/events_dispatcher';
import { useContentByHash } from './lib/use_content_by_hash';
import { HashController } from '../../lib/hash_controller';


export default function CreateOrJoinOrganization(){
  const { userState } = React.useContext(UserContext);
  const [hash, setHash] = React.useState('')
  const content = useContentByHash(hash)

  useEffect(() => {
    HashController
      .setController()
        .addForbiddenPage('join', userState !== "logged")
        .addForbiddenPage('create', userState !== "logged")
        .addForbiddenPage('createTeam', userState !== "logged")
        .addForbiddenPage('createSchool', userState !== "logged")
        .addForbiddenPage('createCompany', userState !== "logged")
      .trySetHash()
      .then(setHash)
      .catch(openLoginDialog)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState, window.location.hash])

  const openLoginDialog = () => {
    EventsDispatcher.setEvent('openLoginDialog').update()
    window.location.hash = '';
  }

  return(
    <CenterComponentPageBase>
      <TitleInfoContentBase
        {...content.settings}
      >
        <content.component/>
      </TitleInfoContentBase>
      <BackgroundWithLines/> 
    </CenterComponentPageBase>
  );
}