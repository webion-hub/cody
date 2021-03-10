import React from 'react';
import { Organizations } from 'src/lib/organizations';

export function useSetOrganizationsValue(elementLoadingLimit){
  const [organizations, setOrganizations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [offset, setOffset] = React.useState(0);

  const setOrganizationsValue = (settings) => {
    setLoading(true)
    setOffset(settings.offset)
    
    const kindFilter = getFilter(settings.filter)

    Organizations.listAll({
      filter: `${kindFilter} ${settings.value}`,
      limit: elementLoadingLimit,
      offset: settings.offset,
    })
    .then(organizations => {
      setLoading(false)
      if(settings.mergeResultWith === undefined)
        setOrganizations(organizations)
      else {
        setOrganizations(
          settings.mergeResultWith.concat(organizations)
        )
      }
    });
  }

  const getFilter = (filter) => {
    const schoolFilter = filter.schools ? "" : "-School"
    const teamFilter = filter.teams ? "" : "-Team"
    const companiesFilter = filter.companies ? "" : "-Company"

    return `${schoolFilter} ${teamFilter} ${companiesFilter}`;
  }
  

  const values = {
    loading: loading,
    offset: offset,
    organizations: organizations
  }

  return [values, setOrganizationsValue]
}