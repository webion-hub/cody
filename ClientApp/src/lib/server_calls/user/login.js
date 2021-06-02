import Requests from "../requests";
import { tryInvokeCallback } from "../utility";


/**
 * @param {TryLoginOptions} options
 * @returns {Promise<AxiosResponse<any>>}
 */
export const tryLogin = async (options) => {
  const {
    userInfo,
    onSuccess,
    onUserNotFound,
    onPasswordMismatch,
  } = options;

  return Requests.send({
    url: `user/login`,
    method: 'POST',
    data: userInfo,
    validateStatus: (status) => {
      return tryInvokeCallback(status, {
        200: onSuccess,
        404: onUserNotFound,
        400: onPasswordMismatch,
      });
    },
  });
}

/**
 * @param {StandardRequestOptions} options 
 * @returns {Promise<AxiosResponse<any>>}
 */
export const tryLoginWithCookie = async (options) => {
  const {
    onSuccess,
    onError,
  } = options;

  return Requests.send({
    url: 'user/login_with_cookie',
    method: 'POST',
    validateStatus: (status) => {
      return tryInvokeCallback(status, {
        200: onSuccess,
        204: onError,
        400: onError,
      });
    },
  });
}


/**
 * @typedef {object} TryLoginOptions
 * @property {LoginRequest} userInfo
 * @property {() => void} [onSuccess]
 * @property {() => void} [onUserNotFound]
 * @property {() => void} [onPasswordMismatch]
 */

/**
 * @typedef {object} LoginRequest
 * @property {string} username
 * @property {string} password
 * @property {bool} rememberMe
 */