import { AxiosResponse } from 'axios';
import Requests from './requests';

export default class OrganizationImages {
  /**
   * @param {number} organizationId 
   */
  constructor(organizationId) {
    this._organizationId = organizationId;
    this.url = Requests.createUrlTag(
      `organization/${organizationId}/images`
    );
  }

  /**
   * @param {number} organizationId 
   * @returns {OrganizationImages}
   */
  static of(organizationId) {
    return new OrganizationImages(organizationId);
  }


  /**
   * @param {OrganizationImagesKind} what 
   * @param {string} base64Image
   * @returns {Promise<AxiosResponse<any>>}
   */
  async update(what, base64Image) {
    const formData = new FormData();
    formData.append('base64', base64Image);
    
    return Requests.send({
      url: this.url`/${what}`,
      method: 'PUT',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
  }

  /**
   * @param {OrganizationImagesKind} what 
   * @returns {Promise<AxiosResponse<any>>}
   */
  async delete(what) {
    return Requests.send({
      url: this.url`/${what}`,
      method: 'DELETE',
    });
  }
}


/**
 * @typedef {'logo' | 'cover'} OrganizationImagesKind
 */