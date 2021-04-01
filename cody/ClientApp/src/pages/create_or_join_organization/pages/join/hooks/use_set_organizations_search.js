import React from 'react';
import { Organizations } from 'src/lib/server_calls/organizations';

export function useSetOrganizationsSearch(elementLoadingLimit){
  const [organizations, setOrganizations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [offset, setOffset] = React.useState(0);

  const setOrganizationsSearch = (settings) => {
    setLoading(true)
    setOffset(settings.offset)
    
    const kindFilter = getFilter(settings.filter)

    Organizations.listAll({
      filter: `${kindFilter} ${settings.value}`,
      limit: elementLoadingLimit,
      offset: settings.offset,
    })
    .then(searchResults => {
      const organizations = searchResults.values;      
      
      if(settings.mergeResultWith === undefined)
        setOrganizations(organizations)
      else {
        const fullList = settings.mergeResultWith.concat(organizations)
        setOrganizations(fullList)
      }
    })
    .finally(() => setLoading(false))
  }

  const getFilter = (filter) => {
    const schoolFilter = filter.schools ? "" : "-School "
    const teamFilter = filter.teams ? "" : "-Team "
    const companiesFilter = filter.companies ? "" : "-Company "

    return `${schoolFilter}${teamFilter}${companiesFilter}`;
  }
  

  const searchSettings = {
    loading: loading,
    offset: offset,
    organizations: organizations
  }

  return [searchSettings, setOrganizationsSearch]
}