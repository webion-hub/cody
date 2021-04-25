import './cody_types';
import User from './admin/user';
import Requests from './requests';

export class Admin {
  /**
   * @param {CommonFilterOptions} options
   * @returns {Promise<SearchResult<Admin.UserResult>>}
   */
  static async getUsers(options) {
    return Requests.search({
      url: 'admin/users',
      method: 'GET',
      params: options,
    });
  }
}

Admin.User = User;

/**
 * @typedef {{
 *  id: number,
 *  username: string,
 *  email: string,
 *  joinedOrganizations: number,
 *  state: {
 *    isEmailVerified: boolean,
 *    hasBeenDeleted: boolean,
 *  },
 *  detail: {
 *    name: string,
 *    surname: string,
 *    birthDate: Date,
 *  },
 *  profilePicture: {
 *    FilePath: string,
 *  }
 * }} Admin.UserResult
 */