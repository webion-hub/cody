import React from 'react';

import { BookmarkOrganizationListItem } from './components/bookmark_organization_list_item';

import { getJoinedOrganizations } from './lib/get_joined_organizations';
import { ListWithSearch } from 'src/components/list_with_search/list_with_search';
import { PageController } from 'src/lib/page_controller';

export function SideBarOrganizationListDrawerContent() {
  const [filter, setFilter] = React.useState("waiting")

  document.addEventListener('drawerFilterState', val => {
    const newFilter = val.detail === "onlyBookmarked" 
      ? "onlyBookmarked" 
      : ""

    setFilter(newFilter)
  })

  return (
    <ListWithSearch
      listHeight={window.innerHeight - 145}
      listMobileHeight={window.innerHeight - 80}
      width="100%"
      elementForStep={25}
      itemSize={56} 
      getList={getJoinedOrganizations}
      listItem={BookmarkOrganizationListItem}
      filter={filter}
      cleanOnFilterChange
      noDataFoundProps={{
        subTitle: "Nessuna organizzazione trovata",
        buttonLabel: "Trovane una",
        buttonHref: "/organization",
        buttonOnClick: e => PageController.push("/organization", e)
      }}
    />
  )
}