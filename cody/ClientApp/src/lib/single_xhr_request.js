import { AxiosResponse, CancelTokenSource } from 'axios';
import axios from 'axios';

/**
 * @callback SingleRequestCallback 
 * @param {CancelTokenSource} tokenSource 
 * @returns {Promise<AxiosResponse<any>>}
 */


export default class SingleXHRRequest {
  constructor() {
    this.timeout = 300;
    this.tokenSource = null;
    this._lastRequest = null;
    this._lastTimeout = null;
  }


  updateCancelToken() {
    this.tokenSource = axios.CancelToken.source();
  }


  /**
   * @param {SingleRequestCallback} request
   */
  async send(request) {
    this._lastRequest = request;
    
    if (!!this.tokenSource) {
      this.tokenSource.cancel();
    }
    this.updateCancelToken();

    if (!!this._lastTimeout) {
      clearTimeout(this._lastTimeout);
    }

    this._lastTimeout = setTimeout(
      _ => this._sendAfterTimeout(request),
      this.timeout
    );
  }


  /**
   * @param {SingleRequestCallback} request 
   */
  async _sendAfterTimeout(request) {
    if (request != this._lastRequest) {
      return;
    }

    try {
      await request(this.tokenSource);
    }
    catch {}
  }
}