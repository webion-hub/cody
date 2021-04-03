import Requests from "../requests";
import { tryInvokeCallback } from "../utility";

/**
 * @param {TryRegisterOptions} options 
 * @returns {Promise<AxiosResponse<any>>}
 */
export const tryRegister = async (options) => {
  const {
    user,
    onSuccess,
    onError,
    onMissingFields,
  } = options;

  return Requests.send({
    url: 'user/register',
    method: 'POST',
    responseType: 'json',
    data: user,
    validateStatus: status => {
      return [200, 409, 400].includes(status);
    },
  })
  .then(response => {
    if (!response)
      return;

    const data = response.data;
    tryInvokeCallback(response.status, {
      200: _ => onSuccess(data),
      409: _ => onError(data),
      400: _ => onMissingFields(data.errors),
    });
  });
}


/**
 * @typedef {object} TryRegisterOptions
 * @property {UserAccount} user
 * @property {File} [profilePicture]
 * @property {(accountDetailId: number) => void} [onSuccess]
 * @property {(fields: string[]) => void} [onMissingFields]
 * @property {() => void} [onImageUploadError]
 * @property {(reasons: UserRejectReasons[]) => void} [onError]
 */