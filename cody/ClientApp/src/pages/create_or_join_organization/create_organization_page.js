import React from 'react';

import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base';
import { OrganizationAction } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organization_action';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { Teacher } from 'src/components/illustrations/teacher';
import { TeamMeeting } from 'src/components/illustrations/team_meeting';
import { Career } from 'src/components/illustrations/career';

export function CreateOrganization(props){

  return(
    <TitleInfoContentBase
      width={1125}
      title="Crea un'organizzazione"
      info={props.info}
      onBack={props.onBack}
    >
      <OrganizationAction
        width="33%"
        image={TeamMeeting}
        buttonLabel="Crea un team"
        endIcon={<ArrowForwardRoundedIcon/>}
        onClick={props.onCreate}
      />
      <OrganizationAction
        width="33%"
        image={Teacher}
        buttonLabel="Aggiungi Istituto"
        endIcon={<AddRoundedIcon/>}
        onClick={props.onCreate}
      />
      <OrganizationAction
        width="33%"
        image={Career}
        buttonLabel="Aggiungi un'azienda"
        endIcon={<AddRoundedIcon/>}
        onClick={props.onCreate}
      />
    </TitleInfoContentBase>
  );
}