import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import RequestsValidator from './requests_validator';
import SingleXHRRequest from './single_xhr_request';

export default class Requests {
  /**
   * @param {SingleXHRRequest} singleXHRRequest
   * @param {AxiosRequestConfig} config
   * @returns {Promise<SearchResult<any>>}
   */
  static async search(singleXHRRequest, config) {
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
  static async send(config) {
    return axios
      .request(config)
      .then(Requests._done)
      .catch(Requests._catch);
  }


  /**
   * @param {AxiosResponse} response 
   * @returns 
   */
  static _done(response) {
    Requests
      ._validator
      .tryRedirect(response);

    return response;
  }

  /**
   * @param {AxiosError} error
   */
  static _catch(error) {
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