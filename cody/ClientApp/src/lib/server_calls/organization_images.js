import { AxiosResponse } from 'axios';
import Requests from './requests';

export default class OrganizationImages {
  /**
   * @param {number} organizationId 
   */
  constructor(organizationId) {
    this._organizationId = organizationId;
  }

  /**
   * @param {number} organizationId 
   * @returns {OrganizationImages}
   */
  static of(organizationId) {
    return new OrganizationImages(organizationId);
  }


  /**
   * @param {OrganizationImages.Kind} what 
   * @param {string} base64Image
   * @returns {Promise<AxiosResponse<any>>}
   */
  async update(what, base64Image) {
    const formData = new FormData();
    formData.append('base64', base64Image);
    
    return Requests.send({
      url: `organizations/${this._organizationId}/${what}`,
      method: 'PUT',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
  }

  /**
   * @param {OrganizationImages.Kind} what 
   * @returns {Promise<AxiosResponse<any>>}
   */
   async delete(what) {
    return Requests.send({
      url: `organizations/${this._organizationId}/${what}`,
      method: 'DELETE',
    });
  }
}


/**
 * @typedef {'logo' | 'cover'} OrganizationImages.Kind
 */