import Requests from "../requests";
import SingleXHRRequest from "../single_xhr_request";


/**
 * @param {number} organizationId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const addBookmarkedOrganization = async (organizationId) => {
  return Requests.send({
    url: `user/bookmarks/organizations/add/${organizationId}`,
    method: 'PUT',
  });
}

/**
 * @param {number} organizationId
 * @returns {Promise<AxiosResponse<any>>} 
 */
export const removeBookmarkedOrganization = async (organizationId) => {
  return Requests.send({
    url: `user/bookmarks/organizations/remove/${organizationId}`,
    method: 'DELETE',
  });
}

/**
 * @param {CommonFilterOptions} options
 * @returns {Promise<SearchResult<Organization>>}
 */
export const getBookmarkedOrganizations = async (options) => {
  return Requests.search({
    url: 'user/bookmarks/organizations',
    method: 'GET',
    params: options,
  });
}