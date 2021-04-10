import React from 'react';

import { JoinOrganizationsListItem } from './components/join_organization_list_item';
import { FilterComponent } from './components/filter_components';
import { getOrganizationFilter } from './lib/get_organization_filter';

import { Organizations } from 'src/lib/server_calls/organizations';
import { ListWithSearch } from 'src/components/list_with_search/list_with_search';

export const joinOrganizationSettings = {
  component: JoinOrganization,
  title: "Unisciti ad un'organizzazione",
  width: 750,
  height: 616,
}

function JoinOrganization(){
  const [filterStatus, setFilterStatus] = React.useState({
    teams: true,
    schools: true,
    companies: true,
  });

  const handleFilter = (filter) => {
    const filterValues = {
      ...filterStatus,
      [filter]: !filterStatus[filter]
    }
    setFilterStatus(filterValues)
  }


  return(
    <ListWithSearch
      listHeight={472}
      listMobileHeight={window.innerHeight - 244}
      width="100%"
      elementForStep={25}
      itemSize={72}
      getList={Organizations.listAll}
      listItem={JoinOrganizationsListItem}
      filter={getOrganizationFilter(filterStatus)}
      filterComponent={
        <FilterComponent
          setFilter={handleFilter}
          filterStatus={filterStatus}
        />
      }
      noDataFoundProps={{
        subTitle: "Nessuna organizzazione trovata",
      }}
    />
  );
}