import { throwIfNullOrEmpty } from './utility';
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
 * @property {(reasons: RegisterErrorReasons[]) => void} [onError]
 */


export class User {
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
        const action = {
          200: onSuccess,
          404: onUserNotFound,
          400: onPasswordMismatch,
        }[response.status];
        
        if (action)
          action();
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
        const action = {
          200: onSuccess,
          400: _ => onError(response.data),
        }[response.status];

        if (action)
          action();
      });
  }
}