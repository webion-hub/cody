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
      base64,
      formFile,
      axiosConfig,
    } = options;

    const formData = new FormData();
    if (base64)
      formData.append('base64', base64);

    else if (formFile)
      formData.append('formFile', formFile, formFile.name);

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
}


/**
 * @typedef {object} CreateOrUpdateOptions
 * @property {string} [base64]
 * @property {File} [formFile]
 * @property {AxiosRequestConfig} axiosConfig
 */
