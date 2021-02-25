import axios from 'axios';
import './cody_types';

export class Admin {
  /**
   * @param {CommonFilterOptions} options
   * @returns {Promise<Admin.UserResult[]>}
   */
  static async getUsers(options) {
    return axios
      .get(`admin/users`, {
        params: options,
      })
      .then(resp => resp.data);
  }
}

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