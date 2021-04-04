import { User } from 'src/lib/server_calls/user';

export const getJoinedOrganizations = (settings) => {
  const {
    searchValue,
    showOnlyBookmarked 
  } = settings

  return new Promise(resolve => {
    if(showOnlyBookmarked){
      User
        .getBookmarkedOrganizations({
          filter: searchValue,
        })
        .then(data => resolve(data))
      
      return;
    }

    User
      .getJoinedOrganizations({
        filter: searchValue,
      })
      .then(data => resolve(data))
  })
}