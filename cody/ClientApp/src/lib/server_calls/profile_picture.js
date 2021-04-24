import { AxiosResponse } from 'axios';
import './cody_types';
import 'axios';
import Requests from './requests';

export class ProfilePicture {
  /**
   * @param {CreateOrUpdateOptions} options
   * @returns {Promise<number>}
   */
  static createOrUpdate = async (options) => {
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
      url: this.url``,
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
  static delete = async () => {
    return Requests.send({
      url: this.url``,
      method: 'DELETE',
    });
  }
}

ProfilePicture.url = Requests.createUrlTag(
  'api/user/profile_picture'
);


/**
 * @typedef {object} CreateOrUpdateOptions
 * @property {string} [base64]
 * @property {File} [formFile]
 */
