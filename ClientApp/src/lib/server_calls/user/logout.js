import Requests from "../requests";
import { tryInvokeCallback } from "../utility";

/**
 * @param {StandardRequestOptions} options 
 */
export const logout = async (options) => {
  const {
    onSuccess,
    onError,
  } = options;

  return Requests.send({
    url: 'user/logout',
    method: 'POST',
    validateStatus: (status) => {
      return tryInvokeCallback(status, {
        200: onSuccess,
        401: onError,
      });
    },
  });
}