import React from 'react';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import { TeamMeeting } from 'src/components/illustrations/team_meeting';
import { NewOrganization } from 'src/components/illustrations/new_oraganization';

import { OrganizationAction } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organization_action';
import { PageController } from 'src/lib/page_controller';


export const selectActionSettings = {
  component: SelectAction,
  title: "Unisciti o crea un'organizzazione",
  width: 750,
  height: 400,
  onBack: null
}

function SelectAction(props){
  return(
    <>
      <OrganizationAction
        image={NewOrganization}
        buttonLabel="Crea"
        endIcon={<ArrowForwardRoundedIcon/>}
        href="/organization#create"
        onClick={(e) => PageController.updateHash("create", e)}
      />
      <OrganizationAction
        image={TeamMeeting}
        buttonLabel="Unisciti"
        endIcon={<ArrowForwardRoundedIcon/>}
        href="/organization#join"
        onClick={(e) => PageController.updateHash("join", e)}
      />
    </>
  );
}