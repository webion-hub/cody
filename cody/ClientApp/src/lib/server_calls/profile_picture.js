import { AxiosResponse } from 'axios';
import './cody_types';
import 'axios';
import Requests from './requests';

export class ProfilePicture {
  /**
   * @param {CreateOrUpdateOptions} options
   * @returns {Promise<number>}
   */
  static async createOrUpdate(options) {
    const {
      base64,
      formFile,
    } = options;

    const formData = new FormData();
    if (base64)
      formData.append('base64', base64);

    else if (formFile)
      formData.append('formFile', formFile, formFile.name);

    return Requests.send({
      url: 'user/profile_picture',
      method: 'PUT',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
    .then(response => response?.data);
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async delete() {
    return Requests.send({
      url: 'user/profile_picture',
      method: 'DELETE',
    });
  }
}


/**
 * @typedef {object} CreateOrUpdateOptions
 * @property {string} [base64]
 * @property {File} [formFile]
 */
