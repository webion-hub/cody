import './cody_types';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export class UserAccountInfo {
  constructor() {
    this._getters = [];
    this._setters = [];
  }
  
  static createRequest() {
    return new UserAccountInfo();
  }

  /**
   * @param {UserAccountProp} prop
   * @returns {UserAccountInfo}
   */
  get = (prop) => {
    this._getters.push(prop);
    return this;
  }

  /**
   * 
   * @param {UserAccountProp} prop 
   * @param {any} value 
   * @returns {UserAccountInfo}
   */
  set = (prop, value) => {
    this._setters[prop] = value;
    return this;
  }

  /**
   * @returns {Promise<SendResult>}
   */
  send = async () => {
    const getRequest = this._maybeGet();
    const setRequest = this._maybeSet();

    return Promise
      .all([getRequest, setRequest])
      .then(response => {
        return {
          got: response[0].data,
          set: response[1].data,
        };
      });
  }

  /**
   * @returns {Promise<AxiosResponse<UserAccountInfoGetResponse>>}
   */
  _maybeGet = async () => {
    return this._requestBase([], {
      url: 'user/info',
      method: 'POST',
      data: this._getters,
    })
    .then(resp => {
      const data = resp.data;
      const mappedValues = Object
        .keys(data)
        .map(key => [key, data[key]]);

      return new Map(mappedValues);
    });
  }

  /**
   * @returns {Promise<AxiosResponse<boolean?>>} 
   */
  _maybeSet = async () => {
    return this._requestBase(null, {
      url: 'user/info',
      method: 'PUT',
      data: this._setters,
    })
    .then(resp => {
      return resp.status == 200;
    });
  }

  /**
   * @param {any} defaultResult
   * @param {AxiosRequestConfig} config
   * @returns {Promise<AxiosResponse<any>>}
   */
  _requestBase = async (config, defaultResult) => {
    if (config.data.length == 0)
      return Promise.resolve(defaultResult);

    return axios.request({
      validateStatus: false,
      ...config,
    });
  }
}


/**
 * @typedef {(
 *  'username' |
 *  'email' |
 *  'name' |
 *  'surname' |
 *  'birthDate'
 * )} UserAccountProp
 */

/**
 * @typedef {Map<UserAccountProp, string>} UserAccountInfoGetResponse
 */

/**
 * @typedef {object} SendResult
 * @property {UserAccountInfoGetResponse} got
 * @property {boolean?} set
 */