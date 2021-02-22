import axios from 'axios';
import './cody_types';

export class Admin {
  /**
   * @param {Admin.GetUsersOptions} options
   * @returns {Promise<Admin.UserResult[]>}
   */
  static async getUsers(options) {
    let {limit, offset} = options;
    limit = limit ? `limit=${limit}` : '';
    offset = `offset=${offset ?? 0}`;

    return axios
      .get(`admin/users?${offset}&${limit}`)
      .then(resp => resp.data);
  }
}

/**
 * @typedef {object} Admin.GetUsersOptions
 * @property {number} [limit]
 * @property {number} [offset]
 */

/**
 * @typedef {{
 *  Id: number,
 *  Username: string,
 *  Email: string,
 *  Detail: {
 *    Name: string,
 *    Surname: string,
 *    BirthDate: Date,
 *  },
 *  ProfilePicture: {
 *    FilePath: string,
 *  },
 *  School: SchoolAccount?
 * }} Admin.UserResult
 */