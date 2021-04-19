import Requests from "../requests";
import SingleXHRRequest from "../single_xhr_request";
import { tryInvokeCallback } from "../utility";


/**
 * @param {number} organizationId
 * @returns {Promise<OrganizationRole?>}
 */
export const getRoleIn = async (organizationId) => {
  return Requests.send({
    url: `user/role_in/${organizationId}`,
    method: 'GET',
  })
  .then(resp => resp.data);
}


/**
 * @param {number} organizationId
 * @returns {Promise<AxiosResponse<any>>} 
 */
export const join = async (organizationId) => {
  return Requests.send({
    url: `user/join/${organizationId}`,
    method: 'POST',
  });
}


/**
 * @param {LeaveOrganizationOptions} options
 * @returns {Promise<AxiosResponse<any>>} 
 */
export const leave = async (options) => {
  const {
    organizationId,
    onSuccess,
    onError,
    onForbidden,
    onNotFound,
  } = options;

  return Requests.send({
    url: `user/leave/${organizationId}`,
    method: 'POST',
    validateStatus: (status) => {
      return tryInvokeCallback(status, {
        200: onSuccess,
        400: onError,
        403: onForbidden,
        404: onNotFound,
      });
    },
  });
}


/**
 * @param {CommonFilterOptions} options
 * @returns {Promise<SearchResult<JoinedOrganization>>} 
 */
export const getJoinedOrganizations = async (options) => {
  return Requests.search(_getJoinedOrgsReq, {
    url: 'user/joined_organizations',
    method: 'GET',
    params: options,
  });
};

const _getJoinedOrgsReq = new SingleXHRRequest();


/**
 * @typedef {object} LeaveOrganizationOptions
 * @property {number} organizationId
 * @property {() => void} [onSuccess]
 * @property {() => void} [onError]
 * @property {() => void} [onForbidden]
 * @property {() => void} [onNotFound]
 */

/**
 * @typedef {object} JoinedOrganization
 * @property {number} id
 * @property {string} name
 * @property {OrganizationKind} kind
 * @property {{hasBeenVerified: boolean}} state
 * @property {boolean} hasLogo
 * @property {boolean} isBookmarked
 */