import { AxiosResponse, CancelTokenSource } from 'axios';
import axios from 'axios';

export default class SingleXHRRequest {
  constructor() {
    this.timeout = 300;
    this.tokenSource = null;
    this._lastRequest = null;
    this._lastTimeout = null;
  }


  /**
   * @param {SingleRequestCallback} request
   */
  async send(request) {
    this._lastRequest = request;
    
    this._maybeCancelLastRequest();
    this._updateCancelToken();
    this._maybeClearLastTimeout();
    
    return new Promise((resolve, reject) => 
      this._scheduleCurrentRequest(request, resolve, reject)
    ); 
  }

  
  _maybeCancelLastRequest() {
    if (!!this.tokenSource) {
      this.tokenSource.cancel();
    }
  }

  _updateCancelToken() {
    this.tokenSource = axios.CancelToken.source();
  }
  
  _maybeClearLastTimeout() {
    if (!!this._lastTimeout) {
      clearTimeout(this._lastTimeout);
    }
  }

  _scheduleCurrentRequest(request, resolve, reject) {
    this._lastTimeout = setTimeout(
      _ => this._maybeSend(request, resolve, reject),
      this.timeout
    );
  }


  /**
   * @param {SingleRequestCallback} request
   */
  async _maybeSend(request, resolve, reject) {
    if (request != this._lastRequest) {
      reject('Canceled');
    }

    try {
      resolve(request(this.tokenSource));
    }
    catch {
      reject('Canceled');
    }
  }
}


/**
 * @callback SingleRequestCallback 
 * @param {CancelTokenSource} tokenSource 
 * @returns {Promise<AxiosResponse<any>>}
 */