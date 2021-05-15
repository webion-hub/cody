import Lesson from './lesson';
import Organization from './organization';
import Requests from './requests';

export default class Course {
  /**
   * @param {Organization} organization 
   */
  static of = (organization) => {
    return new Course(organization);
  }
  
  /**
   * @param {Organization} organization
   */
  constructor(organization) {
    this._organization = organization;
  }

  /**
   * @param {number} courseId
   * @returns {Course} 
   */
  withId = (courseId) => {
    this._id = courseId;
    this.lesson = Lesson.of(this).withId;
    this.url = Requests.createUrlTag(
      this._organization.url`/course/${this._id}`
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