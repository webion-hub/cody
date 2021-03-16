import axios from 'axios';
import './cody_types';
import SingleXHRRequest from './single_xhr_request';

export class Admin {
  /**
   * @param {CommonFilterOptions} options
   * @returns {Promise<Admin.UserResult[]>}
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
}


Admin._getUsersReq = new SingleXHRRequest();

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
 *  }
 * }} Admin.UserResult
 */