import { invokeCallback } from './utility';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import './cody_types';

export class User {
  /**
   * @param {ExistsWithOptions} options
   * @returns {Promise<boolean>} 
   */
  static async existsWith(options) {
    const {
      usernameOrEmail,
    } = options;

    return axios
      .request({
        url: `user/exists/${usernameOrEmail}/`,
        method: 'GET',
      })
      .then(resp => resp.data);
  }


  /**
   * @param {StandardRequestOptions} options 
   */
  static async logout(options) {
    const {
      onSuccess,
      onError,
    } = options;

    return axios
      .request({
        url: 'user/logout',
        method: 'POST',
        validateStatus: false,
      })
      .then(response => {
        invokeCallback(response.status, {
          200: onSuccess,
          401: onError,
        });
      });
  }


  /**
   * @param {TryLoginOptions} options
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async tryLogin(options) {
    const {
      userInfo,
      onSuccess,
      onUserNotFound,
      onPasswordMismatch,
    } = options;

    return axios
      .request({
        url: `user/login`,
        method: 'POST',
        validateStatus: false,
        data: userInfo,
      })
      .then(response => {
        invokeCallback(response.status, {
          200: onSuccess,
          404: onUserNotFound,
          400: onPasswordMismatch,
        });
      });
  }


  /**
   * @param {StandardRequestOptions} options 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async tryLoginWithCookie(options) {
    const {
      onSuccess,
      onError,
    } = options;

    return axios
      .request({
        url: 'user/login_with_cookie',
        method: 'POST',
        validateStatus: false,
      })
      .then(response => {
        invokeCallback(response.status, {
          200: onSuccess,
          400: onError,
        });
      });
  }


  /**
   * @param {TryRegisterOptions} options 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async tryRegister(options) {
    const {
      user,
      onSuccess,
      onError,
      onMissingFields,
    } = options;

    return axios
      .request({
        url: 'user/register',
        method: 'POST',
        responseType: 'json',
        validateStatus: false,
        data: user,
      })
      .then(response => {
        const data = response.data;
        invokeCallback(response.status, {
          200: _ => onSuccess(data),
          409: _ => onError(data),
          400: _ => onMissingFields(data.errors),
        });
      });
  }
}


/**
* @typedef {object} ExistsWithOptions
* @property {string} usernameOrEmail
*/

/**
 * @typedef {object} LoginRequest
 * @property {string} username
 * @property {string} password
 * @property {bool} rememberMe
 */

/**
 * @typedef {object} TryLoginOptions
 * @property {LoginRequest} userInfo
 * @property {() => void} [onSuccess]
 * @property {() => void} [onUserNotFound]
 * @property {() => void} [onPasswordMismatch]
 */

/**
 * @typedef {object} TryRegisterOptions
 * @property {UserAccount} user
 * @property {File} [profilePicture]
 * @property {(accountDetailId: number) => void} [onSuccess]
 * @property {(fields: string[]) => void} [onMissingFields]
 * @property {() => void} [onImageUploadError]
 * @property {(reasons: UserRejectReasons[]) => void} [onError]
 */