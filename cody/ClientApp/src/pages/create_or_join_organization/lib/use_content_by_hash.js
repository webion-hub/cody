import loadable from '@loadable/component'

import { selectActionSettings } from 'src/pages/create_or_join_organization/pages/select_action/select_action';
import { createOrganizationSettings } from 'src/pages/create_or_join_organization/pages/create/create_organization';
import { createTeamSettings } from 'src/pages/create_or_join_organization/pages/create/pages/create_team';
import { createSchoolSettings } from 'src/pages/create_or_join_organization/pages/create/pages/create_school';
import { createCompanySettings } from 'src/pages/create_or_join_organization/pages/create/pages/create_company';
import { joinOrganizationSettings } from 'src/pages/create_or_join_organization/pages/join/join_organization';
import { useOrganizationsInfoSettings } from 'src/pages/create_or_join_organization/pages/info/organizations_info';

const SelectAction = loadable(() => import('src/pages/create_or_join_organization/pages/select_action/select_action'))
const CreateOrganization = loadable(() => import('src/pages/create_or_join_organization/pages/create/create_organization'))
const CreateTeam = loadable(() => import('src/pages/create_or_join_organization/pages/create/pages/create_team'))
const CreateSchool = loadable(() => import('src/pages/create_or_join_organization/pages/create/pages/create_school'))
const CreateCompany = loadable(() => import('src/pages/create_or_join_organization/pages/create/pages/create_company'))
const JoinOrganization = loadable(() => import('src/pages/create_or_join_organization/pages/join/join_organization'))
const OrganizationsInfo = loadable(() => import('src/pages/create_or_join_organization/pages/info/organizations_info'))

export const useContentByHash = (hash) => {
  const organizationsInfoSettings = useOrganizationsInfoSettings()

  const action = {
    'create': {
      settings: createOrganizationSettings,
      component: CreateOrganization
    },
    'createteam': {
      settings: createTeamSettings,
      component: CreateTeam
    },
    'createschool': {
      settings: createSchoolSettings,
      component: CreateSchool
    },
    'createcompany': {
      settings: createCompanySettings,
      component: CreateCompany
    },
    'join': {
      settings: joinOrganizationSettings,
      component: JoinOrganization
    },
    'info': {
      settings: organizationsInfoSettings,
      component: OrganizationsInfo
    },
  }[hash];

  return action ?? {
    settings: selectActionSettings, 
    component: SelectAction
  };
}
