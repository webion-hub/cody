import { throwIfNullOrEmpty } from './utility';

'use-strict';

/**
 * @typedef {object} UserAccount
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */


export class User {
  /**
   * @param {string} username 
   * @param {string} password
   * @returns {Promise}
   */
  static tryLogin(username, password) {
    throwIfNullOrEmpty(username, 'username');
    throwIfNullOrEmpty(password, 'password');
    
    const login = 
      fetch(`user/login/${username}/${password}`);

    login.then(response => {
      return response.status;
    });

    return login;
  }
}