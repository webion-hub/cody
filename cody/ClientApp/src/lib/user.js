import { tryInvokeCallback } from './utility';
import { AxiosResponse } from 'axios';
import './cody_types';
import './organizations';
import Requests from './requests';
import SingleXHRRequest from './single_xhr_request';

export class User {
  static async addBookmarkedOrganization(organizationId) {
    return Requests.send({
      url: `user/bookmarks/organizations/add/${organizationId}`,
      method: 'PUT',
    });
  }

  /**
   * @param {CommonFilterOptions} options
   * @returns {Promise<SearchResult<Organization>>}
   */
  static async getBookmarkedOrganizations(options) {
    return Requests.search(User._getBookmarkedOrgsReq, {
      url: 'user/bookmarks/organizations',
      method: 'GET',
      params: options,
    });
  }


  /**
   * @returns {Promise<User.ThemeColor?>}
   */
  static async getThemeColor() {
    return Requests.send({
      url: 'user/theme',
      method: 'GET',
    })
    .then(resp => resp.data);
  }


  /**
   * @param {User.ThemeColor} color 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async setThemeColor(color) {
    return Requests.send({
      url: `user/theme/${color}`,
      method: 'PUT',
    });
  }


  /**
   * @returns {Promise<AxiosResponse<any>>} 
   */
  static async sendNewVerificationEmail() {
    return Requests.send({
      url: 'user/verify/send_new_verification_email',
      method: 'GET',
    });
  }


  /**
   * @returns {Promise<boolean>}
   */
  static async isLogged() {
    return Requests.send({
      url: 'user/is_logged',
      method: 'GET',
    })
    .then(resp => resp?.data);
  }


  /**
   * @param {ExistsWithOptions} options
   * @returns {Promise<boolean>} 
   */
  static async existsWith(options) {
    const {
      usernameOrEmail,
    } = options;

    return Requests.send({
      url: `user/exists/${usernameOrEmail}/`,
      method: 'GET',
    })
    .then(resp => resp?.data);
  }


  /**
   * @param {StandardRequestOptions} options 
   */
  static async logout(options) {
    const {
      onSuccess,
      onError,
    } = options;

    return Requests.send({
      url: 'user/logout',
      method: 'POST',
      validateStatus: (status) => {
        return tryInvokeCallback(status, {
          200: onSuccess,
          401: onError,
        });
      },
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

    return Requests.send({
      url: `user/login`,
      method: 'POST',
      data: userInfo,
      validateStatus: (status) => {
        return tryInvokeCallback(status, {
          200: onSuccess,
          404: onUserNotFound,
          400: onPasswordMismatch,
        });
      },
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

    return Requests.send({
      url: 'user/login_with_cookie',
      method: 'POST',
      validateStatus: (status) => {
        return tryInvokeCallback(status, {
          200: onSuccess,
          400: onError,
        });
      },
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

    return Requests.send({
      url: 'user/register',
      method: 'POST',
      responseType: 'json',
      data: user,
      validateStatus: status => {
        return [200, 409, 400].includes(status);
      },
    })
    .then(response => {
      if (!response)
        return;

      const data = response.data;
      tryInvokeCallback(response.status, {
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
    return Requests.send({
      url: `user/join/${organizationId}`,
      method: 'POST',
    });
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
   * @returns {Promise<SearchResult<User.JoinedOrganization>>} 
   */
  static async getJoinedOrganizations(options) {
    return Requests.search(User._getJoinedOrgsReq, {
      url: 'user/joined_organizations',
      method: 'GET',
      params: options,
    });
  }
}

User._getBookmarkedOrgsReq = new SingleXHRRequest();
User._getJoinedOrgsReq = new SingleXHRRequest();


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
 * @property {{hasBeenVerified: boolean}} state
 * @property {boolean} hasLogo 
 */

/**
 * @typedef {'Light' | 'Dark'} User.ThemeColor
 */