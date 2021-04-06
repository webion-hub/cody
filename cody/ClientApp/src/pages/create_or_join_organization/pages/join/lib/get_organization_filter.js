export const getOrganizationFilter = (filter) => {
  const schoolFilter = filter.schools ? "" : "-School "
  const teamFilter = filter.teams ? "" : "-Team "
  const companiesFilter = filter.companies ? "" : "-Company "

  return `${schoolFilter}${teamFilter}${companiesFilter}`;
}