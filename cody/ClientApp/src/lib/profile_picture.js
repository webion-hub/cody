import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import './cody_types';
import 'axios';

/**
 * @typedef {object} CreateOrUpdateOptions
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
      picture,
      axiosConfig,
    } = options;

    const formData = new FormData();
    formData.append(picture.name, picture);

    return axios
      .request({
        url: 'profile_picture/create_or_update',
        method: 'PUT',
        data: formData,
        ...axiosConfig,
      })
      .then(response => response.data);
  }
}