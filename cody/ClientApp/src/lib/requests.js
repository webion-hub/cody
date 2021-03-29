import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import EventEmitter from 'events';

export default class Requests {
  /**
   * @param {AxiosRequestConfig} config 
   * @returns {Promise<AxiosResponse<any>>} 
   */
  static async send(config) {
    return axios
      .request(config)
      .then(resp => {
        Requests._tryRedirect(resp);
        return resp;
      })
      .catch(err => {
        if (Requests._wasCanceled(err.request, err.response))
          return;

        if (Requests._tryRedirect(err.response))
          return;

        Requests._handleRequestError(err)
      });
  }

  static _wasCanceled(request, response) {
    return !request && !response;
  }

  /**
   * @param {AxiosResponse} response 
   * @returns {boolean}
   */
  static _tryRedirect(response) {
    const {
      request, 
      status, 
      config,
    } = response;

    if (!request)
      return false;

    const responseURL = new URL(request.responseURL);
    const requestURL = new URL(config.url, responseURL.origin);
    const wasARedirect = 
      status == 200 && responseURL.href != requestURL.href;

    if (!wasARedirect)
      return false;

    Requests.raise('redirect', request.responseURL);
    return true;
  }

  static _handleRequestError(error) {
    const {
      request,
      response,
    } = error;

    if (response && Requests._tryRaiseErrorFromResponse(response))
      return;
    
    const reason = request && !response
      ? 'networkError'
      : 'genericError';

    Requests.raise('error', reason);
  }


  static _tryRaiseErrorFromResponse(response) {
    const status = response.status;
    const reasons = Requests._mappedReasons;

    if (reasons.has(status))
      Requests.raise('error', reasons.get(status));

    return reasons.has(status);
  }


  /**
   * @param {Request.EventKind} what 
   * @param {Request.ErrorReasons} why
   */
  static raise(what, why) {
    this._eventsEmitter.emit(what, why);
  }

  /**
   * @param {(reason: Request.ErrorReasons) => void} callback
   */
  static set onError(callback) {
    this._eventsEmitter.on('error', callback);
  }

  /**
   * @param {(where: string) => void} callback
   */
   static set onRedirect(callback) {
    this._eventsEmitter.on('redirect', callback);
  }
}

Requests._eventsEmitter = new EventEmitter();

/**@type {Map<number, Request.ErrorReasons} */
Requests._mappedReasons = new Map([
  [500, 'serverError'],
  [413, 'sizeTooBig'],
  [401, 'unauthorized'],
  [400, 'badRequest'],
  [404, 'notFound'],
]);


/**
 * @typedef {(
 *  'error' |
 *  'redirect'
 * )} Request.EventKind
 */

/**
 * @typedef {(
 *  'serverError' |
 *  'networkError' |
 *  'genericError' |
 *  'sizeTooBig' |
 *  'unauthorized' |
 *  'badRequest' |
 *  'notFound' |
 *  'redirect'
 * )} Request.ErrorReasons
 */