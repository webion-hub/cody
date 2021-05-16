import Course from "./course";
import User from "./organization/user";
import Requests from "./requests";

export default class Organization {
  /**
   * @param {number} organizationId 
   */
  static withId(organizationId) {
    return new Organization(organizationId); 
  }

  /**
   * @param {number} organizationId 
   */
  constructor(organizationId) {
    this._id = organizationId;
    this.user = User.of(this).withId;
    this.course = Course.of(this).withId;
    this.url = Requests.createUrlTag(
      `organization/${organizationId}`
    );
  }


  /**
   * @returns {Promise<Cody.Organization>}
   */
  getInfo = async () => {
    return Requests.send({
      url: this.url``,
      method: 'GET',
    })
    .then(response => response?.data);
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  verify = async () => {
    return Requests.send({
      url: this.url`/verify`,
      method: 'PATCH',
    });
  }

  /**
   * @returns {Promise<AxiosResponse<any>>}
   */
  delete = async () => {
    return Requests.send({
      url: this.url``,
      method: 'DELETE',
    });
  }

  /** 
   * @returns {Promise<AxiosResponse<any>>}
   */
  restore = async () => {
    return Requests.send({
      url: this.url`/restore`,
      method: 'PATCH',
    });
  }

  /**
   * @param {CommonFilterOptions} options 
   * @returns {Promise<SearchResult<OrganizationMember>>}
   */
  getMembers = async (options) => {
    return Requests.search({
      url: this.url`/members`,
      params: options,
    });
  }

  isCourseDuplicate = async (title) => {
    return Requests.get({
      url: this.url`/courses/is_duplicate/${title}`,
    });
  }

  /**
   * @param {CourseCreationRequest} course
   * @returns {Promise<number>} courseId 
   */
  createCourse = async (course) => {
    course.organizationId = this._id;
    return Requests.send({
      url: this.url`/courses/create`,
      method: 'POST',
      data: course,
    })
    .then(resp => resp.data);
  }

  /**
   * @param {CommonFilterOptions} options 
   * @returns {Promise<SearchResult<OrganizationMember>>}
   */
  getCourses = async (options) => {
    return Requests.search({
      url: this.url`/courses`,
      params: options,
    });
  }
}


/**
 * @typedef {object} Cody.Organization
 * @property {number} [id]
 * @property {string} name
 * @property {number} membersCount
 * @property {boolean} isCallerAMember
 * @property {boolean} hasLogo
 * @property {boolean} hasCover
 * @property {OrganizationKind} kind
 * @property {OrganizationState} state
 * @property {OrganizationDetail} detail
 */

/**
 * @typedef {'School' | 'Company' | 'Team'} OrganizationKind
 */

/**
 * @typedef {object} OrganizationState
 * @property {boolean} hasBeenVerified
 * @property {boolean} hasBeenDeleted
 * @property {OrganizationVisibility} visibility
 * @property {OrganizationAccessCriteria} accessCriteria
 */

/** @typedef {'Public' | 'Private'} OrganizationVisibility */
/** @typedef {'Open' | 'OnInvite'} OrganizationAccessCriteria */


/**
 * @typedef {object} OrganizationDetail
 * @property {string} [city]
 * @property {string} [region]
 * @property {string} [country]
 * @property {string} [description]
 * @property {string} [website]
 */


/**
 * @typedef {object} OrganizationMember
 * @property {number} id
 * @property {string} username
 * @property {string} name
 * @property {string} surname
 * @property {OrganizationRole} role
 */

/**
 * @typedef {object} CourseCreationRequest
 * @property {string} title
 * @property {number} organizationId
 * @property {string} [description]
 */