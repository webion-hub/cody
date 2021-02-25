import { invokeCallback } from './utility';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import './cody_types';

export class School {
  /**
   * @param {CreateNewOptions} options
   * @returns {Promise<number>}
   */
  static async createNew(options) {
    const {
      school,
      onSuccess,
      onError,
    } = options;

    return await axios
      .request({
        url: 'school/create_new',
        method: 'POST',
        data: school,
        validateStatus: false,
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
   * @param {CommonFilterOptions} options
   * @returns {Promise<SchoolAccount[]>}
   */
  static async getAll(options) {
    return axios
      .request({
        url: 'school/get',
        method: 'GET',
        params: options,
      })
      .then(response => response.data);
  }
}


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
 */