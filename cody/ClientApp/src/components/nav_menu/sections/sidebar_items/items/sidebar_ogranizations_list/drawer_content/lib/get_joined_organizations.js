import { User } from 'src/lib/server_calls/user';

export const getJoinedOrganizations = (settings) => {
  const {
    filter,
    offset,
    limit,
  } = settings

  return new Promise(resolve => {
    const filterNotUndefined = filter ? filter : ""
    const showOnlyBookmarked = filterNotUndefined.startsWith("onlyBookmarked");
    const prepFilter = filterNotUndefined.replace("onlyBookmarked", "");

    if(showOnlyBookmarked){
      User
        .getBookmarkedOrganizations({
          filter: prepFilter,
          limit: limit,
          offset: offset,
        })
        .then(data => resolve(data))
      
      return;
    }

    User
      .getJoinedOrganizations({
        filter: prepFilter,
        limit: limit,
        offset: offset,
      })
      .then(data => resolve(data))
  })
}