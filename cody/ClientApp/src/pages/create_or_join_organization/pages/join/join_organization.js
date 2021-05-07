import React from 'react';

import { JoinOrganizationsListItem } from '../../../../components/list_items/join_organization_list_item';
import { FilterComponent } from './components/filter_components';
import { getOrganizationFilter } from './lib/get_organization_filter';

import { Organizations } from 'src/lib/server_calls/organizations';
import { ListWithSearch } from 'src/components/lists/list_with_search/list_with_search';

export const joinOrganizationSettings = {
  title: "Unisciti ad un'organizzazione",
  width: 750,
  height: 616,
}

export default function JoinOrganization(){
  const [filters, setFilters] = React.useState(['Team', 'School', "Company"]);

  return(
    <ListWithSearch
      listHeight={472}
      listMobileHeight={window.innerHeight - 264}
      width="100%"
      elementForStep={25}
      itemSize={72}
      getList={Organizations.listAll}
      listItem={JoinOrganizationsListItem}
      filter={getOrganizationFilter(filters)}
      filterComponent={
        <FilterComponent
          onFiltersChange={setFilters}
          filters={filters}
        />
      }
      noDataFoundProps={{
        subTitle: "Nessuna organizzazione trovata",
      }}
    />
  );
}