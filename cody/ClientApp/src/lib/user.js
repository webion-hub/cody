import { invokeCallback } from './utility';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import './cody_types';
import './organizations';

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


  /**
   * @param {number} organizationId
   * @returns {Promise<AxiosResponse<any>>} 
   */
  static async join(organizationId) {
    return axios.post(`user/join/${organizationId}`);
  }


  /**
   * @param {User.LeaveOrganizationOptions} options
   * @returns {Promise<AxiosResponse<any>>} 
   */
   static async leave(options) {
    const {
      organizationId,
      onSuccess,
      onError,
      onForbidden,
      onNotFound,
    } = options;

    return axios
      .request({
        url: `user/leave/${organizationId}`,
        method: 'POST',
        validateStatus: false,
      })
      .then(resp => {
        invokeCallback(resp.status, {
          200: onSuccess,
          400: onError,
          403: onForbidden,
          404: onNotFound,
        });
      });
  }


  /**
   * @returns {Promise<User.JoinedOrganization[]>} 
   */
  static async getJoinedOrganizations() {
    return axios
      .get('user/joined_organizations', {
        validateStatus: false,
      })
      .then(resp => resp.data);
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

/**
 * @typedef {object} User.LeaveOrganizationOptions
 * @property {number} organizationId
 * @property {() => void} [onSuccess]
 * @property {() => void} [onError]
 * @property {() => void} [onForbidden]
 * @property {() => void} [onNotFound]
 */

/**
 * @typedef {object} User.JoinedOrganization
 * @property {number} id
 * @property {string} name
 * @property {OrganizationKind} kind
 * @property {boolean} hasBeenVerified 
 */