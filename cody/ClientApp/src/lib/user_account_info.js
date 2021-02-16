import './cody_types';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export class UserAccountInfo {
  constructor() {
    this._getters = [];
    this._setters = {};
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
          got: response[0],
          set: response[1],
        };
      });
  }

  /**
   * @returns {Promise<UserAccountInfoGetResponse>}
   */
  _maybeGet = async () => {
    if (this._getters.length == 0)
      return Promise.resolve(new Map([]));

    return axios
      .request({
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
   * @returns {Promise<UserRejectReasons[]>} 
   */
  _maybeSet = async () => {
    if (Object.keys(this._setters).length == 0)
      return Promise.resolve(null);

    return axios
      .request({
        url: 'user/info',
        method: 'PUT',
        validateStatus: false,
        data: this._setters,
      })
      .then(resp => resp.status == 200
        ? []
        : resp.data
      );
  }
}


/**
 * @typedef {(
 *  'username' |
 *  'email' |
 *  'name' |
 *  'surname' |
 *  'birthDate' |
 *  'role'
 * )} UserAccountProp
 */

/**
 * @typedef {Map<UserAccountProp, string>} UserAccountInfoGetResponse
 */

/**
 * @typedef {object} SendResult
 * @property {UserAccountInfoGetResponse} got
 * @property {UserRejectReasons[]} set
 */