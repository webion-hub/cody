import axios from 'axios';
import { AxiosResponse } from 'axios';
import { invokeCallback } from './utility';
import SingleXHRRequest from './single_xhr_request';


export class Organizations {
  /**
   * @param {number} id 
   * @returns {Promise<Organization>}
   */
  static async getById(id) {
    return axios
      .request({
        url: `organizations/${id}`,
        method: 'GET',
        validateStatus: false,
      })
      .then(response => response.data);
  }


  /**
   * @param {number} id 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async delete(id) {
    return axios.delete(`organizations/${id}`);
  }


  /**
   * @param {number} id 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async restore(id) {
    return axios.patch(`organizations/restore/${id}`);
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

    return axios
      .request({
        url: 'organizations/create_new',
        method: 'POST',
        data: organization,
        validateStatus: false,
      })
      .then(response => {
        const organizationId = response.data;
        invokeCallback(response.status, {
          201: _ => onSuccess(organizationId),
          409: _ => onConflict(organizationId),
          400: _ => onError(),
        });
      });
  }


  /**
   * @param {Organizations.ListAllOptions} options
   * @returns {Promise<Organization[]>}
   */
  static async listAll(options) {
    return Organizations._listAllReq.send(tokenSource => {
      return axios
        .request({
          url: 'organizations',
          method: 'GET',
          cancelToken: tokenSource.token,
          params: options,
        })
        .then(response => response.data)
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
 * @typedef {object} Organizations.ListAllOptions
 * @property {string} [filter]
 * @property {number} [limit]
 * @property {number} [offset]
 */

/**
 * @typedef {object} Organization
 * @property {number} [id]
 * @property {string} name
 * @property {number} membersCount
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
 */

/**
 * @typedef {object} OrganizationDetail
 * @property {string} [city]
 * @property {string} [region]
 * @property {string} [country]
 * @property {string} [description]
 * @property {string} [website]
 */