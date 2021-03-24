import axios from 'axios';
import './cody_types';
import SingleXHRRequest from './single_xhr_request';

export class Admin {
  /**
   * @param {CommonFilterOptions} options
   * @returns {Promise<SearchResult<Admin.UserResult>>}
   */
  static async getUsers(options) {
    return Admin._getUsersReq.send(tokenSource => {
      return axios
        .get(`admin/users`, {
          cancelToken: tokenSource.token,
          params: options,
        })
        .then(resp => resp.data);
    });
  }

  /**
   * @param {number} id 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async deleteUser(id) {
    return axios.delete(`admin/users/${id}`);
  }


  /**
   * @param {number} id 
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async restoreUser(id) {
    return axios.patch(`admin/users/restore/${id}`);
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