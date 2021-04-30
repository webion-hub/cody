import React from 'react';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';


import { OrganizationAction } from 'src/pages/create_or_join_organization/pages/select_action/components/organization_action';
import { PageController } from 'src/lib/page_controller';
import { NewOrganization, TeamMeeting } from 'src/components/illustrations/illustrations';


export const selectActionSettings = {
  component: SelectAction,
  title: "Unisciti o crea un'organizzazione",
  width: 750,
  height: 395,
  hideBackButton: true
}

function SelectAction(){
  return(
    <>
      <OrganizationAction
        image={<NewOrganization/>}
        buttonLabel="Crea"
        endIcon={<ArrowForwardRoundedIcon/>}
        href="/organization#create"
        onClick={(e) => PageController.updateHash("create", e)}
      />
      <OrganizationAction
        image={<TeamMeeting/>}
        buttonLabel="Unisciti"
        endIcon={<ArrowForwardRoundedIcon/>}
        href="/organization#join"
        onClick={(e) => PageController.updateHash("join", e)}
      />
    </>
  );
}