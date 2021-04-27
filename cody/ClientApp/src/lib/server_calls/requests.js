import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import RequestsValidator from './requests_validator';
import SingleXHRRequest from './single_xhr_request';

export default class Requests {
  /**
   * @param {string} baseUrl 
   */
  static createUrlTag = (baseUrl) => {
    return (strings, ...values) => {
      const raw = String.raw(strings, values);
      const postfix = raw.length > 0 && !raw.startsWith('/')
        ? '/' + raw
        : raw;

      return baseUrl + postfix;
    };
  }


  /**
   * @param {AxiosRequestConfig} config
   * @returns {Promise<SearchResult<any>>}
   */
  static search = async (config) => {
    const singleXHRRequest = 
      this._getSingleXHRRequestFrom(config.url);

    return singleXHRRequest.send(async tokenSource => {
      return Requests.send({
        ...config,
        cancelToken: tokenSource.token,
      })
      .then(response => {
        return response 
          ? response.data
          : {total: 0, values: []};
      });
    });
  }

  static _getSingleXHRRequestFrom = (url) => {
    if (!Requests._searchRequests[url])
      Requests._searchRequests[url] = new SingleXHRRequest();
      
    return Requests._searchRequests[url];
  }


  /**
   * @param {AxiosRequestConfig} config
   * @returns {Promise} 
   */
  static get = async (config) => {
    return Requests.send({
      method: 'GET',
      ...config
    })
    .then(resp => resp?.data);
  }


  /**
   * @param {AxiosRequestConfig} config 
   * @returns {Promise<AxiosResponse<any>>} 
   */
  static send = async (config) => {
    Requests._maybeAddPrefix(config);
    
    return axios
      .request(config)
      .then(Requests._done)
      .catch(Requests._catch);
  }

  /**
   * @param {AxiosRequestConfig} config
   */
   static _maybeAddPrefix = (config) => {
    if (!config.url.startsWith('api/'))
      config.url = 'api/' + config.url;
  }


  /**
   * @param {AxiosResponse} response 
   * @returns {AxiosResponse}
   */
  static _done = (response) => {
    Requests
      ._validator
      .tryRedirect(response);

    if (!("data" in response))
      response.data = null;

    if (response.status === 204 && response.data === '')
      response.data = null;

    return response;
  }

  /**
   * @param {AxiosError} error
   */
  static _catch = (error) => {
    const validator = Requests._validator;
    const {request, response} = error;

    if (validator.wasCanceled(request, response))
      return;

    if (validator.tryRaiseNetworkError(error))
      return;

    if (validator.tryRedirect(response))
      return;

    validator.handleRequestError(error)
  }


  /**
   * @param {Requests.OnErrorCallback} callback
   */
  static set onError(callback) {
    this._validator.on('error', callback);
  }

  /**
   * @param {Requests.OnRedirectCallback} callback
   */
   static set onRedirect(callback) {
    this._validator.on('redirect', callback);
  }
}

Requests._validator = new RequestsValidator();
Requests._searchRequests = {};