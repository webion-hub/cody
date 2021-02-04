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
      axiosConfig,
    } = options;

    return axios
      .request({
        url: `user/exists/${usernameOrEmail}/`,
        method: 'GET',
        ...axiosConfig,
      })
      .then(resp => resp.data);
  }


  /**
   * @param {LogoutOptions} options 
   */
  static async logout(options) {
    const {
      onSuccess,
      onError,
      axiosConfig,
    } = options;

    return axios
      .request({
        url: 'user/logout',
        method: 'POST',
        validateStatus: false,
        ...axiosConfig,
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
      axiosConfig,
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
        ...axiosConfig,
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
   * @param {CookieLoginOptions} options 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async tryLoginWithCookie(options) {
    const {
      onSuccess,
      onError,
      axiosConfig,
    } = options;

    return axios
      .request({
        url: 'user/login_with_cookie',
        method: 'POST',
        validateStatus: false,
        ...axiosConfig,
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
      axiosConfig,
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
        ...axiosConfig,
      })
      .then(response => {
        const data = response.data;
        invokeCallback(response.status, {
          200: _ => onSuccess(data),
          400: _ => {
            return data.errors !== undefined
              ? _ => onMissingFields(data.errors)
              : _=> onError(data);
          },
        });
      });
  }
}


/**
 * @typedef {(
 *  'username' | 
 *  'password' | 
 *  'email' | 
 *  'name' | 
 *  'surname' | 
 *  'user_exists' | 
 *  'email_exists' | 
 *  'server_error'
 * )} RegisterErrorReasons
 */


/**
* @typedef {object} ExistsWithOptions
* @property {string} usernameOrEmail
* @property {AxiosRequestConfig} [axiosConfig]
*/

/**
 * @typedef {object} LoginRequest
 * @property {string} username
 * @property {string} password
 * @property {bool} rememberMe
 */

/**
 * @typedef {object} LogoutOptions
 * @property {() => void} [onSuccess]
 * @property {() => void} [onError]
 * @property {AxiosRequestConfig} [axiosConfig]
 */

/**
 * @typedef {object} TryLoginOptions
 * @property {LoginRequest} userInfo
 * @property {AxiosRequestConfig} [axiosConfig]
 * @property {() => void} [onSuccess]
 * @property {() => void} [onUserNotFound]
 * @property {() => void} [onPasswordMismatch]
 */

/**
 * @typedef {object} CookieLoginOptions
 * @property {() => void} [onSuccess]
 * @property {() => void} [onError] 
 * @property {AxiosRequestConfig} [axiosConfig]
 */

/**
 * @typedef {object} TryRegisterOptions
 * @property {UserAccount} user
 * @property {File} [profilePicture]
 * @property {AxiosRequestConfig} [axiosConfig]
 * @property {(accountDetailId: number) => void} [onSuccess]
 * @property {(fields: string[]) => void} [onMissingFields]
 * @property {() => void} [onImageUploadError]
 * @property {(reasons: RegisterErrorReasons[]) => void} [onError]
 */