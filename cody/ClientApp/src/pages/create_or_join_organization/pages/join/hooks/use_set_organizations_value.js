import React from 'react';
import { Organizations } from 'src/lib/organizations';

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
      
      setLoading(false)
      if(settings.mergeResultWith === undefined)
        setOrganizations(organizations)
      else {
        const fullList = settings.mergeResultWith.concat(organizations)
        setOrganizations(fullList)
      }
    });
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