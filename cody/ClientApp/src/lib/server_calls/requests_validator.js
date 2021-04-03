import { AxiosResponse, AxiosError } from 'axios';
import EventEmitter from 'events';

export default class RequestsValidator {
  constructor() {
    this._eventsEmitter = new EventEmitter();
  }


  /**
   * @param {any} request 
   * @param {AxiosResponse} response 
   * @returns {boolean}
   */
  wasCanceled(request, response) {
    return !request && !response;
  }


  /**
   * @param {AxiosError} error 
   */
  tryRaiseNetworkError(error) {
    const isNetworkError =
      error.isAxiosError && error.message === 'Network Error';

    if (isNetworkError)
      this.raise('error', 'networkError');

    return isNetworkError;
  }


  /**
   * @param {AxiosResponse} response 
   * @returns {boolean}
   */
  tryRedirect(response) {
    const {
      request, 
      status, 
      config,
    } = response;

    if (!request)
      return false;

    const responseURL = new URL(request.responseURL);
    const requestURL = new URL(config.url, responseURL.origin);
    const wasRedirected = 
      status == 200 && responseURL.pathname != requestURL.pathname;

    if (!wasRedirected)
      return false;

    this.raise('redirect', request.responseURL);
    return true;
  }


  /**
   * @param {AxiosError} error 
   */
  handleRequestError(error) {
    const {
      request,
      response,
    } = error;

    if (response && this._tryRaiseErrorFromResponse(response))
      return;
    
    const reason = request && !response
      ? 'networkError'
      : 'genericError';

    this.raise('error', reason);
  }

  /**
   * @param {AxiosResponse} response 
   * @returns {boolean}
   */
  _tryRaiseErrorFromResponse(response) {
    const status = response.status;
    const reasons = RequestsValidator._mappedReasons;

    if (reasons.has(status))
      this.raise('error', reasons.get(status));

    return reasons.has(status);
  }


  /**
   * @param {Requests.EventKind} what 
   * @param {Requests.ErrorReason} why
   */
  raise(what, why) {
    this._eventsEmitter.emit(what, why);
  }

  /**
   * @param {Requests.EventKind} event 
   * @param {Requests.OnErrorCallback | Requests.OnRedirectCallback} callback 
   */
  on(event, callback) {
    this._eventsEmitter.on(event, callback);
  }
}

/**@type {Map<number, Requests.ErrorReason} */
RequestsValidator._mappedReasons = new Map([
  [500, 'serverError'],
  [413, 'sizeTooBig'],
  [401, 'unauthorized'],
  [400, 'badRequest'],
  [404, 'notFound'],
]);


/**
 * @callback Requests.OnErrorCallback
 * @param {Requests.ErrorReason} reason
 */

/**
 * @callback Requests.OnRedirectCallback
 * @param {string} location
 */

/**
 * @typedef {(
 *  'error' |
 *  'redirect'
 * )} Requests.EventKind
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
 * )} Requests.ErrorReason
 */