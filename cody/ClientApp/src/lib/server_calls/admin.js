import './cody_types';
import Requests from './requests';
import SingleXHRRequest from './single_xhr_request';

export class Admin {
  /**
   * @param {number} userId 
   * @param {UserAccountRole} role 
   */
  static async setUserRole(userId, role) {
    return Requests.send({
      url: `admin/users/${userId}/role/${role}`,
      method: 'PUT',
    });
  }

  /**
   * @param {number} userId
   * @returns {Promise<UserAccountRole>} 
   */
  static async getUserRole(userId) {
    return Requests.send({
      url: `admin/users/${userId}`,
      method: 'GET',
    })
    .then(resp => resp.data);
  }

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
   static async deleteUserForever(id) {
    return Requests.send({
      url: `admin/users/delete_forever/${id}`,
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