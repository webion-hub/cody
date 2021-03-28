import React from 'react';

import { GenericSearchBar } from 'src/components/pickers/search_bars/generic_search_bar/generic_search_bar';
import { SideBarHomeIcon } from './items/sidebar_home_icon';
import { SideBarOrganizationList } from './items/sidebar_organizations_list';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import GroupWorkRoundedIcon from '@material-ui/icons/GroupWorkRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';


export const sideBarItems = [
	{
		item: SideBarHomeIcon,
    label: "Home",
    href: "/",
    icon: <HomeRoundedIcon/>
	},
	{
		identifier: "organizationList",
		item: SideBarOrganizationList,
		drawerContent: <GenericSearchBar/>,
		width: 400,
    label: "Le tue organizzazioni",
    icon: <ListRoundedIcon/>,
	},
  {
    label: "Crea o unisciti ad una organizzazione",
    icon: <GroupWorkRoundedIcon/>,
    href: "/organization",
    skipOnBigScreen: true,
	},
]