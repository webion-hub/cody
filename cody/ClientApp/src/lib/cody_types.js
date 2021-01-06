/**
 * @typedef {object} UserAccount
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {UserAccountDetail} accountDetail
 */

/**
 * @typedef {object} UserAccountDetail
 * @property {string} name
 * @property {string} surname
 * @property {Date} birthDate
 * @property {SchoolAccount} [school]
 */

/**
 * @typedef {object} SchoolAccount
 * @property {string} name
 * @property {string} city
 * @property {string} country
 */