import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import RequestsValidator from './requests_validator';
import SingleXHRRequest from './single_xhr_request';

export default class Requests {
  /**
   * @param {string} baseUrl 
   */
  static createUrlTag = (baseUrl) => {
    return (strings, ..._) => {
      const raw = strings.raw[0];
      const postfix = raw.length > 0 && !raw.startsWith('/')
        ? '/' + raw
        : raw;

      return baseUrl + postfix;
    };
  }


  /**
   * @param {SingleXHRRequest} singleXHRRequest
   * @param {AxiosRequestConfig} config
   * @returns {Promise<SearchResult<any>>}
   */
  static search = async (singleXHRRequest, config) => {
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


  /**
   * @param {AxiosRequestConfig} config 
   * @returns {Promise<AxiosResponse<any>>} 
   */
  static send = async (config) => {
    return axios
      .request(config)
      .then(Requests._done)
      .catch(Requests._catch);
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