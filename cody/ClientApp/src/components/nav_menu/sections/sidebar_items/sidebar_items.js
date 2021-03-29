import React from 'react';

import { SideBarHomeIcon } from './items/sidebar_home_icon';
import { SideBarOrganizationList } from './items/sidebar_ogranizations_list/sidebar_organizations_list';
import { SideBarOrganizationListDrawerContent } from './items/sidebar_ogranizations_list/drawer_content/sidebar_organizations_list_drawer_content';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import GroupWorkRoundedIcon from '@material-ui/icons/GroupWorkRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';

import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { SideBarCreateOrJoinOrganizationIcon } from './items/sidebar_create_or_join_organization_icon';


export const useSideBarItems = () => {
  const { userState } = React.useContext(UserContext);
  const isNotLogged = userState !== "logged"
  const isLogged = userState === "logged"

  const sideBarItems = [
    {
      item: SideBarHomeIcon,
      label: "Home",
      href: "/",
      icon: <HomeRoundedIcon/>
    },
    {
      identifier: "organizationList",
      item: SideBarOrganizationList,
      drawerContent: <SideBarOrganizationListDrawerContent/>,
      width: 500,
      label: "Le tue organizzazioni",
      icon: <ListRoundedIcon/>,
      hideWhen: isNotLogged
    },
    {
      item: SideBarCreateOrJoinOrganizationIcon,
      label: "Crea o unisciti ad una organizzazione",
      icon: <GroupWorkRoundedIcon/>,
      href: "/organization",
      skipOnBigScreen: isLogged,
    },
  ]

  return sideBarItems;
}