/**
 * @typedef {object} UserAccount
 * @property {string} username
 * @property {string} email
 * @property {string} [password]
 * @property {UserAccountDetail} accountDetail
 */

/**
 * @typedef {object} UserAccountDetail
 * @property {string} name
 * @property {string} surname
 * @property {Date} birthDate
 * @property {number} [profilePictureId]
 * @property {UserProfilePicture} [profilePicture]
 */

/**
 * @typedef {object} UserProfilePicture
 * @property {number} [id] 
 * @property {File} picture
 */

/**
 * @typedef {object} StandardRequestOptions
 * @property {() => void} [onSuccess]
 * @property {() => void} [onError]
 */

/**
 * @typedef {(
 *  'username' | 
 *  'password' | 
 *  'email' | 
 *  'name' | 
 *  'surname' | 
 *  'user_exists' | 
 *  'email_exists' | 
 *  'server_error'
 * )} UserRejectReasons
 */

/**
 * @typedef {(
 *  'Admin' |
 *  'User'
 * )} UserAccountRole
 */

/**
 * @typedef {object} CommonFilterOptions
 * @property {string} [filter]
 * @property {number} [limit]
 * @property {number} [offset]
 */


/**
 * @template T
 * @typedef {object} SearchResult
 * @property {number} total
 * @property {T[]} values
 */