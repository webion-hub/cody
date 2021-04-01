import './cody_types';
import Requests from './requests';
import SingleXHRRequest from './single_xhr_request';

export class Admin {
  /**
   * @param {CommonFilterOptions} options
   * @returns {Promise<SearchResult<Admin.UserResult>>}
   */
  static async getUsers(options) {
    return Requests.search(Admin._getUsersReq, {
      url: 'admin/users',
      method: 'GET',
      params: options,
    });
  }

  /**
   * @param {number} id 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async deleteUser(id) {
    return Requests.send({
      url: `admin/users/${id}`,
      method: 'DELETE',
    });
  }


  /**
   * @param {number} id 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async restoreUser(id) {
    return Requests.send({
      url: `admin/users/restore/${id}`,
      method: 'PATCH',
    });
  }
}


Admin._getUsersReq = new SingleXHRRequest();

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