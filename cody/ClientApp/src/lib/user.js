import { invokeCallback, maybeGetCancelToken } from './utility';
import { AxiosResponse, CancelToken } from 'axios';
import axios from 'axios';
import './cody_types';


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
 * @property {CancelToken} [cancelToken]
 */

/**
 * @typedef {object} TryLoginOptions
 * @property {string} username
 * @property {string} password
 * @property {CancelToken} [cancelToken]
 * @property {() => void} [onSuccess]
 * @property {() => void} [onUserNotFound]
 * @property {() => void} [onPasswordMismatch]
 */

/**
 * @typedef {object} TryRegisterOptions
 * @property {UserAccount} user
 * @property {CancelToken} [cancelToken]
 * @property {() => void} [onSuccess]
 * @property {(fields: string[]) => void} [onMissingFields]
 * @property {(reasons: RegisterErrorReasons[]) => void} [onError]
 */


export class User {
  /**
   * @param {ExistsWithOptions} options
   * @returns {boolean} 
   */
  static async existsWith(options) {
    const {
      usernameOrEmail,
      cancelToken,
    } = options;

    return await axios
      .request({
        url: `user/exists/${usernameOrEmail}`,
        method: 'GET',
        ...maybeGetCancelToken(cancelToken),
      })
      .then(resp => resp.data);
  }


  /**
   * @param {TryLoginOptions} options
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async tryLogin(options) {
    const {
      username,
      password,
      cancelToken,
      onSuccess,
      onUserNotFound,
      onPasswordMismatch,
    } = options;

    return axios
      .request({
        url: `user/login/${username}/${password}/`,
        method: 'GET',
        validateStatus: false,
        ...maybeGetCancelToken(cancelToken),
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
   * @param {TryRegisterOptions} options 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async tryRegister(options) {
    const {
      user,
      cancelToken,
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
        ...maybeGetCancelToken(cancelToken),
      })
      .then(response => {
        const data = response.data;
        const errorCallback = data.errors != undefined
          ? _ => onMissingFields(Object.keys(data.errors))
          : _=> onError(response.data);

        invokeCallback(response.status, {
          200: onSuccess,
          400: errorCallback,
        });
      });
  }
}