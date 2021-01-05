import { throwIfNullOrEmpty } from './utility';


/**
 * @typedef {object} UserAccount
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {UserAccountDetail} accountDetail
 */

/**
 * @typedef {object} UserAccountDetail
 * @property {string} name
 * @property {string} surname
 * @property {Date} birthDate
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