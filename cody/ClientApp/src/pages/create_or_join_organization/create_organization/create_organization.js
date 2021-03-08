import React from 'react';

import { TitleInfoContentBase } from 'src/components/bases/title_info_content_base';
import { OrganizationAction } from 'src/pages/create_or_join_organization/create_or_join_organization_components/organization_action';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { Teacher } from 'src/components/illustrations/teacher';
import { TeamWork } from 'src/components/illustrations/team_work';
import { Career } from 'src/components/illustrations/career';
import { PageController } from 'src/lib/page_controller';

export function CreateOrganization(props){

  return(
    <>
      <OrganizationAction
        width="33%"
        image={TeamWork}
        buttonLabel="Crea Team"
        endIcon={<ArrowForwardRoundedIcon/>}
        onClick={() => PageController.updateHash("createTeam")}
      />
      <OrganizationAction
        width="33%"
        image={Teacher}
        buttonLabel="Aggiungi Istituto"
        endIcon={<AddRoundedIcon/>}
        onClick={() => PageController.updateHash("createSchool")}
      />
      <OrganizationAction
        width="33%"
        image={Career}
        buttonLabel="Aggiungi Azienda"
        endIcon={<AddRoundedIcon/>}
        onClick={() => PageController.updateHash("createCompany")}
      />
    </>
  );
}