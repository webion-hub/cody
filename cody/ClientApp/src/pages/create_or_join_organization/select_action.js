import React from 'react';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import { TeamMeeting } from 'src/components/illustrations/team_meeting';
import { NewOrganization } from 'src/components/illustrations/new_oraganization';
import { OrganizationAction } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organization_action';

export function SelectAction(props){
  return(
    <>
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
    </>
  );
}