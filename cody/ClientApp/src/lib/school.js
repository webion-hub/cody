import { invokeCallback } from './utility';
import { CancelToken, AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import './cody_types';


/**
 * @callback SchoolCreationCallback
 * @param {number} schoolId
 * @returns {void}
 */

/**
 * @typedef {object} CreateNewOptions
 * @property {SchoolAccount} school
 * @property {SchoolCreationCallback} [onSuccess]
 * @property {SchoolCreationCallback} [onError]
 * @property {AxiosRequestConfig} [axiosConfig]
 */


export class School {
  /**
   * @param {CreateNewOptions} options
   * @returns {Promise<AxiosResponse<number>>}
   */
  static async createNew(options) {
    const {
      school,
      axiosConfig,
      onSuccess,
      onError,
    } = options;

    return await axios
      .request({
        url: 'school/create_new',
        method: 'POST',
        data: school,
        validateStatus: false,
        ...axiosConfig,
      })
      .then(response => {
        const schoolId = response.data;
        invokeCallback(response.status, {
          200: _ => onSuccess(schoolId),
          400: _ => onError(schoolId),
        });
      });
  }


  /**
   * @param {{axiosConfig?: AxiosRequestConfig}} options
   * @returns {Promise<SchoolAccount[]>}
   */
  static async getAll(options) {
    return axios
      .request({
        url: 'school/get_all',
        method: 'GET',
        ...options.axiosConfig,
      })
      .then(response => response.data);
  }
}