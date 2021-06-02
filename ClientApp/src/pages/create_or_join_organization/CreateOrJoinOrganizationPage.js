import React, { useEffect } from 'react';

import { BackgroundWithLines } from 'src/components/others/background_with_lines/background_with_lines';
import { CenterComponentPageBase } from 'src/components/bases/layouts/center_component_page_base';
import { TitleInfoContentBase } from 'src/components/bases/papers/title_info_content_base/title_info_content_base';

import { UserContext } from 'src/components/global_contexts/user_controller_context/user_controller_context';
import { EventsDispatcher } from 'src/lib/events_dispatcher';
import { useContentByHash } from './lib/use_content_by_hash';
import { HashController } from '../../lib/hash_controller';


export default function CreateOrJoinOrganization(){
  const { userState } = React.useContext(UserContext);
  const [hash, setHash] = React.useState('')
  const content = useContentByHash(hash)

  useEffect(() => {
    const notLogged = userState === "notLogged"
    HashController
      .setController()
        .addForbiddenPage('join', notLogged)
        .addForbiddenPage('create', notLogged)
        .addForbiddenPage('createteam', notLogged)
        .addForbiddenPage('createschool', notLogged)
        .addForbiddenPage('createcompany', notLogged)
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
        <content.component suspenseHeight={content.settings.height}/>
      </TitleInfoContentBase>
      <BackgroundWithLines/> 
    </CenterComponentPageBase>
  );
}