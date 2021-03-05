import React from 'react';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base';

import { TeamMeeting } from 'src/components/illustrations/team_meeting';
import { NewOrganization } from 'src/components/illustrations/new_oraganization';
import { OrganizationAction } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organization_action';

export function SelectAction(props){
  return(
    <TitleInfoContentBase
      title="Unisciti o crea un'organizzazione"
      info={props.info}
    >
      <OrganizationAction
        image={NewOrganization}
        buttonLabel="Crea"
        endIcon={<ArrowForwardRoundedIcon/>}
        onClick={props.onCreate}
      />
      <OrganizationAction
        image={TeamMeeting}
        buttonLabel="Unisciti"
        endIcon={<ArrowForwardRoundedIcon/>}
        onClick={props.onJoin}
      />
    </TitleInfoContentBase>
  );
}