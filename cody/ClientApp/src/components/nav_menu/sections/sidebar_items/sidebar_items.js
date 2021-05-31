import React from 'react';

import { SideBarHomeIcon } from './items/sidebar_home_icon';
import { SideBarThemeIcon } from './items/sidebar_theme_icon';
import { SideBarOrganizationList } from './items/sidebar_ogranizations_list/sidebar_organizations_list';
import { SideBarOrganizationListDrawerContent } from './items/sidebar_ogranizations_list/drawer_content/sidebar_organizations_list_drawer_content';

import { UserContext } from 'src/components/global_contexts/user_controller_context/user_controller_context';
import { SideBarCreateOrJoinOrganizationIcon } from './items/sidebar_create_or_join_organization_icon';


export const useSideBarItems = () => {
  const { userState } = React.useContext(UserContext);
  const isNotLogged = userState !== "logged"
  const isLogged = userState === "logged"

  const sideBarItems = [
    {
      item: SideBarHomeIcon,
      href: "/",
    },
    {
      identifier: "organizationList",
      item: SideBarOrganizationList,
      drawerContent: <SideBarOrganizationListDrawerContent/>,
      width: 500,
      hideWhen: isNotLogged
    },
    {
      item: SideBarCreateOrJoinOrganizationIcon,
      hideWhen: isLogged
    },
    {
      item: SideBarThemeIcon,
    },
  ]

  return sideBarItems;
}