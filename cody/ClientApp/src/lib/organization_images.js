import { AxiosResponse } from 'axios';
import axios from "axios";

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
    return axios.put(`organizations/${this._organizationId}/${what}`, {
      data: {
        base64: base64Image, 
      },
    });
  }

  /**
   * @param {OrganizationImages.Kind} what 
   * @returns {Promise<AxiosResponse<any>>}
   */
   async delete(what) {
    return axios.delete(`organizations/${this._organizationId}/${what}`);
  }
}


/**
 * @typedef {'logo' | 'background'} OrganizationImages.Kind
 */