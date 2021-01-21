import axios, { AxiosRequestConfig } from 'axios';
import './cody_types';
import 'axios';

/**
 * @typedef {object} CreateOrUpdateOptions
 * @property {number} accountDetailId
 * @property {File} picture
 * @property {AxiosRequestConfig} axiosConfig
 */


export class ProfilePicture {
  /**
   * @param {CreateOrUpdateOptions} options
   * @returns {Promise<number>}
   */
  static async createOrUpdate(options) {
    const {
      accountDetailId,
      picture,
      axiosConfig,
    } = options;

    const formData = new FormData();
    formData.append('accountDetailId', accountDetailId);
    formData.append('picture', picture, picture.name);

    return axios
      .request({
        url: 'profile_picture/create_or_update',
        method: 'PUT',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        ...axiosConfig,
      })
      .then(response => response.data);
  }
}