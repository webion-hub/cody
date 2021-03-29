import { AxiosResponse } from 'axios';
import { tryInvokeCallback } from './utility';
import SingleXHRRequest from './single_xhr_request';
import Requests from './requests';


export class Organizations {
  /**
   * @param {number} id 
   * @returns {Promise<Organization>}
   */
  static async getById(id) {
    return Requests.send({
      url: `organizations/${id}`,
      method: 'GET',
    })
    .then(response => response?.data);
  }


  /**
   * @param {number} id 
   * @returns {Promise<AxiosResponse<any>>}
   */
   static async verify(id) {
    return Requests.send({
      url: `organizations/verify/${id}`,
      method: 'PATCH',
    });
  }


  /**
   * @param {number} id 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async delete(id) {
    return Requests.send({
      url: `organizations/${id}`,
      method: 'DELETE',
    });
  }


  /**
   * @param {number} id 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async restore(id) {
    return Requests.send({
      url: `organizations/restore/${id}`,
      method: 'PATCH',
    });
  }


  /**
   * @param {Organizations.CreateNewOptions} options
   * @returns {Promise<AxiosResponse>}
   */
  static async createNew(options) {
    const {
      organization,
      onSuccess,
      onConflict,
      onError,
    } = options;

    return Requests.send({
      url: 'organizations/create_new',
      method: 'POST',
      data: organization,
      validateStatus: (status) => {
        return [201, 409, 400].includes(status);
      },
    })
    .then(response => {
      if (!response)
        return;

      const organizationId = response.data;
      tryInvokeCallback(response.status, {
        201: _ => onSuccess(organizationId),
        409: _ => onConflict(organizationId),
        400: _ => onError(),
      });
    });
  }


  /**
   * @param {CommonFilterOptions} options
   * @returns {Promise<SearchResult<Organization>>}
   */
  static async listAll(options) {
    return Organizations._listAllReq.send(tokenSource => {
      return Requests.send({
        url: 'organizations',
        method: 'GET',
        cancelToken: tokenSource.token,
        params: options,
      })
      .then(response => {
        return response 
          ? response.data
          : {total: 0, values: []};
      })
    });
  }
}

Organizations._listAllReq = new SingleXHRRequest();


/**
 * @typedef {object} Organizations.CreateNewOptions
 * @property {Organizations.CreateNewRequest} organization
 * @property {(organizationId: number) => void} [onSuccess]
 * @property {(organizationId: number) => void} [onConflict]
 * @property {() => void} [onError]
 */

/**
 * @typedef {object} Organizations.CreateNewRequest
 * @property {string} name 
 * @property {OrganizationKind} kind 
 * @property {string} city 
 * @property {string} country 
 */

/**
 * @typedef {object} Organization
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