import { invokeCallback } from './utility';
import { AxiosResponse } from 'axios';
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
 * @typedef {object} TryLoginOptions
 * @property {string} username
 * @property {string} password
 * @property {() => void} [onSuccess]
 * @property {() => void} [onUserNotFound]
 * @property {() => void} [onPasswordMismatch]
 */

/**
 * @typedef {object} TryRegisterOptions
 * @property {UserAccount} user
 * @property {() => void} [onSuccess]
 * @property {(fields: string[]) => void} [onMissingFields]
 * @property {(reasons: RegisterErrorReasons[]) => void} [onError]
 */


export class User {
  /**
   * @param {string} usernameOrEmail
   * @returns {boolean} 
   */
  static async existsWith(usernameOrEmail) {
    return await axios
      .get(`user/exists/${usernameOrEmail}`)
      .then(resp => {
        return {
          200: true,
          400: false,
        }[resp.status];
      });
  }


  /**
   * @param {TryLoginOptions} options
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async tryLogin(options) {
    const {
      username,
      password,
      onSuccess,
      onUserNotFound,
      onPasswordMismatch,
    } = options;

    return axios
      .request({
        url: `user/login/${username}/${password}/`,
        method: 'GET',
        validateStatus: false,
      })
      .then(response => {
        const actions = {
          200: onSuccess,
          404: onUserNotFound,
          400: onPasswordMismatch,
        };
        
        invokeCallback(response.status, actions);
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
        const errorCallback = data.errors != undefined
          ? _ => onMissingFields(Object.keys(data.errors))
          : _=> onError(response.data);

        const actions = {
          200: onSuccess,
          400: errorCallback,
        };

        invokeCallback(response.status, actions);
      });
  }
}