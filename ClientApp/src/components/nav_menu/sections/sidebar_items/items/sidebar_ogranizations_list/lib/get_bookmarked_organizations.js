import { User } from 'src/lib/server_calls/user';

export const getBookmarkedOrganizations = (settings) => {
  const maxOrganizationsNumber = settings.maxOrganizationsNumber

  return new Promise(async resolve => {
    let allOrganizations;
    let totalOrganizations;

    await User
      .getBookmarkedOrganizations({
        filter: "+logo",
        limit: maxOrganizationsNumber
      })
      .then(async data => {
        allOrganizations = data.values
        totalOrganizations = allOrganizations.length

        if(totalOrganizations < maxOrganizationsNumber)
          await User
            .getBookmarkedOrganizations({
              filter: "-+logo",
              limit: maxOrganizationsNumber - totalOrganizations
            })
            .then(data => {
              const organizationsWithoutLogo = data.values
              const numberOfOrganizationsWithoutLogo = organizationsWithoutLogo.length

              allOrganizations = allOrganizations.concat(organizationsWithoutLogo)
              totalOrganizations += numberOfOrganizationsWithoutLogo
            })
      })

    resolve({
      values: allOrganizations,
      total: totalOrganizations
    })
  })
}