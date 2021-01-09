import { invokeCallback } from './utility';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
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
 * @property {AxiosRequestConfig} [axiosConfig]
 */

/**
 * @typedef {object} TryLoginOptions
 * @property {string} username
 * @property {string} password
 * @property {AxiosRequestConfig} [axiosConfig]
 * @property {() => void} [onSuccess]
 * @property {() => void} [onUserNotFound]
 * @property {() => void} [onPasswordMismatch]
 */

/**
 * @typedef {object} TryRegisterOptions
 * @property {UserAccount} user
 * @property {AxiosRequestConfig} [axiosConfig]
 * @property {() => void} [onSuccess]
 * @property {(fields: string[]) => void} [onMissingFields]
 * @property {(reasons: RegisterErrorReasons[]) => void} [onError]
 */


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
   * @param {TryLoginOptions} options
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async tryLogin(options) {
    const {
      username,
      password,
      axiosConfig,
      onSuccess,
      onUserNotFound,
      onPasswordMismatch,
    } = options;

    return axios
      .request({
        url: `user/login/${username}/${password}/`,
        method: 'GET',
        validateStatus: false,
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
        invokeCallback(response.status, {
          200: onSuccess,
          400: _ => {
            const data = response.data;
            return data.errors != undefined
              ? _ => onMissingFields(data.errors)
              : _=> onError(data);
          },
        });
      });
  }
}