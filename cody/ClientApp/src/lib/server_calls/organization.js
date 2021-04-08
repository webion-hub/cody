import Requests from "./requests";
import SingleXHRRequest from "./single_xhr_request";


export default class Organization {

  /**
   * @param {number} organizationId 
   */
  constructor(organizationId) {
    this._id = organizationId;
  }

  /**
   * @param {number} organizationId 
   * @returns {Organization}
   */
  static withId(organizationId) {
    return new Organization(organizationId); 
  }


  /**
   * @returns {Promise<Cody.Organization>}
   */
   getInfo = async () => {
    return Requests.send({
      url: `organizations/${this._id}`,
      method: 'GET',
    })
    .then(response => response?.data);
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
   verify = async () => {
    return Requests.send({
      url: `organizations/verify/${this._id}`,
      method: 'PATCH',
    });
  }

  /** 
   * @returns {Promise<AxiosResponse<any>>}
   */
  delete = async () => {
    return Requests.send({
      url: `organizations/${this._id}`,
      method: 'DELETE',
    });
  }

  /** 
   * @returns {Promise<AxiosResponse<any>>}
   */
  restore = async () => {
    return Requests.send({
      url: `organizations/restore/${this._id}`,
      method: 'PATCH',
    });
  }

  /**
   * @param {CommonFilterOptions} options 
   * @returns {Promise<SearchResult<OrganizationMember>>}
   */
   getMembersOf = async (options) => {
    return Requests.search(Organization._getMembersReq, {
      url: `organizations/${this._id}/members`,
      method: 'GET',
      params: options,
    });
  }
}


Organization._getMembersReq = new SingleXHRRequest();


/**
 * @typedef {object} Cody.Organization
 * @property {number} [id]
 * @property {string} name
 * @property {number} membersCount
 * @property {boolean} isCallerAMember
 * @property {boolean} hasLogo
 * @property {boolean} hasCover
 * @property {OrganizationKind} kind
 * @property {OrganizationState} state
 * @property {OrganizationDetail} detail
 */

/**
 * @typedef {'School' | 'Company' | 'Team'} OrganizationKind
 */

/**
 * @typedef {object} OrganizationState
 * @property {boolean} hasBeenVerified
 * @property {boolean} hasBeenDeleted
 * @property {OrganizationVisibility} visibility
 * @property {OrganizationAccessCriteria} accessCriteria
 */

/** @typedef {'Public' | 'Private'} OrganizationVisibility */
/** @typedef {'Open' | 'OnInvite'} OrganizationAccessCriteria */


/**
 * @typedef {object} OrganizationDetail
 * @property {string} [city]
 * @property {string} [region]
 * @property {string} [country]
 * @property {string} [description]
 * @property {string} [website]
 */


/**
 * @typedef {object} OrganizationMember
 * @property {number} id
 * @property {string} username
 * @property {OrganizationRole} role
 */

/**
 * @typedef {'User' | 'Admin' | 'Owner'} OrganizationRole
 */