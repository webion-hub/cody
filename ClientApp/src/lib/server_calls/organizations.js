import { AxiosResponse } from 'axios';
import { tryInvokeCallback } from './utility';
import Requests from './requests';


export class Organizations {
  /**
   * @param {Organizations.CreateNewOptions} options
   * @returns {Promise<AxiosResponse>}
   */
  static createNew = async (options) => {
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
  static listAll = async (options) => {
    return Requests.search({
      url: 'organizations',
      method: 'GET',
      params: options,
    });
  }


  /**
   * @param {string} name 
   * @param {import('./organization').OrganizationKind} kind 
   * @returns {Promise<boolean>}
   */
  static exists = async (name, kind) => {
    return Requests.get({
      url: `organizations/exists/${kind}/${name}/`,
    });
  }
}


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