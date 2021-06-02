import Requests from "../requests";

/**
   * @returns {Promise<AxiosResponse<any>>} 
   */
export const sendNewVerificationEmail = async () => {
  return Requests.send({
    url: 'user/verify/send_new_verification_email',
    method: 'GET',
  });
}


/**
 * @returns {Promise<boolean>}
 */
export const isLogged = async () => {
  return Requests.send({
    url: 'user/is_logged',
    method: 'GET',
  })
  .then(resp => resp?.data);
}


/**
 * @param {ExistsWithOptions} options
 * @returns {Promise<boolean>} 
 */
export const existsWith = async (options) => {
  const {
    usernameOrEmail,
  } = options;

  return Requests.send({
    url: `user/exists/${usernameOrEmail}/`,
    method: 'GET',
  })
  .then(resp => resp?.data);
}


/**
 * @typedef {object} ExistsWithOptions
 * @property {string} usernameOrEmail
 */