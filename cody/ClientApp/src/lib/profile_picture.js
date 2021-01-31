import axios, { AxiosRequestConfig } from 'axios';
import './cody_types';
import 'axios';

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
    formData.append('picture', picture, picture.name);

    return axios
      .request({
        url: 'profile_picture',
        method: 'PUT',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        ...axiosConfig,
      })
      .then(response => response.data);
  }


  /**
   * @param {DownloadOptions} options 
   */
  static async download(options) 
  {
    const {axiosConfig} = options;

    return axios.get('profile_picture', axiosConfig);
  }
}


/**
 * @typedef {object} CreateOrUpdateOptions
 * @property {File} picture
 * @property {AxiosRequestConfig} axiosConfig
 */

/**
 * @typedef {object} DownloadOptions
 * @property {AxiosRequestConfig} axiosConfig
 */