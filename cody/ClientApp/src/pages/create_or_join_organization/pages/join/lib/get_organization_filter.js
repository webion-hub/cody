export const getOrganizationFilter = (filters) => {
  const teamFilter = getFilter(filters, "Team")
  const companyFilter = getFilter(filters, "Company")
  const schoolFilter = getFilter(filters, "School")

  return `${teamFilter}${companyFilter}${schoolFilter}`;
}

const getFilter = (filters, filterStr) => {
  const notShowFilter = filters.findIndex(filter => filter === filterStr) === -1

  if(notShowFilter)
    return `-${filterStr} `
  
  return ""
}