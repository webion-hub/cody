import React from 'react';

import { BookmarkOrganizationListItem } from 'src/components/lists/list_items/bookmark_organization_list_item';

import { getJoinedOrganizations } from './lib/get_joined_organizations';
import { ListWithSearch } from 'src/components/lists/list_with_search/list_with_search';
import { PageController } from 'src/lib/page_controller';

export function SideBarOrganizationListDrawerContent() {
  const [filter, setFilter] = React.useState("@waiting")

  const updateState = (val) => {
    const newFilter = val?.detail === "onlyBookmarked" 
      ? "onlyBookmarked" 
      : ""

    setFilter(newFilter)
  }

  document.addEventListener('drawerFilterState', updateState)

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