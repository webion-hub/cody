import Requests from '../requests';

export default class Course {
  /**
   * @param {number} organizationId 
   */
  static of = (organizationId) => {
    return new Course(organizationId);
  }
  
  /**
   * @param {number} organizationId 
   */
  constructor(organizationId) {
    this._organizationId = organizationId;
  }

  /**
   * @param {number} courseId
   * @returns {Course} 
   */
  withId = (courseId) => {
    this._id = courseId;
    this.url = Requests.createUrlTag(
      `organization/${this._organizationId}/course/${this._id}`
    );

    return this;
  }


  /**
   * @returns {Promise<CourseInfo>} 
   */
  getInfo = () => {
    return Requests.get({
      url: this.url``,
    });
  }

  /**
   * @returns {Promise<Lesson[]>} 
   */
  getLessons = () => {
    return Requests.get({
      url: this.url`/lessons`,
    });
  }

  getMembers = () => {
    return Requests.get({
      url: this.url`/members`,
    });
  }
}


/**
 * @typedef {object} CourseInfo
 * @property {number} id
 * @property {string} title
 * @property {string} [description]
 */

/**
 * @typedef {object} Lesson
 * @property {number} id
 * @property {string} title
 * @property {string} [description]
 * @property {LessonType} type
 */

/**
 * @typedef {(
 *  'Lesson' |
 *  'Exercise'
 * )} LessonType
 */