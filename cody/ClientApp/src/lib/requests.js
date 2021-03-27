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
      .catch(Requests._handleRequestError);
  }

  static _handleRequestError(error) {
    const {
      request,
      response,
    } = error;

    if (response && Requests._tryRaiseErrorFromResponse(response))
      return;
    
    const reason = request
      ? 'networkError'
      : 'genericError';

    Requests.raise('error', reason);
  }

  static _tryRaiseErrorFromResponse(response) {
    const status = response.status;
    const reasons = Requests._mappedReasons;

    if (reasons.has(status))
      Requests.raise('error', reasons.get(status));
  }


  /**
   * @param {'error'} what 
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
 *  'serverError' |
 *  'networkError' |
 *  'genericError' |
 *  'sizeTooBig' |
 *  'unauthorized' |
 *  'badRequest' |
 *  'notFound'
 * )} Request.ErrorReasons
 */