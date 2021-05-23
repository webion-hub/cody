import Organization from "./organization";
import Requests from "./requests";

export default class Courses {
  /**
   * @param {Organization} organization 
   * @returns {Courses}
   */
  static of = (organization) => {
    return new Courses(organization);
  }

  /**
   * @param {Organization} organization 
   */
  constructor(organization) {
    this.organization = organization;
    this.url = Requests.createUrlTag(
      organization.url`/courses`
    );
  }


  /**
   * @param {string} title 
   * @returns {Promise<boolean>}
   */
  exists = async (title) => {
    return Requests.get({
      url: this.url`/exists/${title}`,
    });
  }

  /**
   * @param {CourseCreationRequest} course
   * @returns {Promise<number>} courseId 
   */
  create = async (course) => {
    course.organizationId = this.organization._id;
    return Requests.send({
      url: this.url`/create`,
      method: 'POST',
      data: course,
    })
    .then(resp => resp.data);
  }

  /**
   * @param {CommonFilterOptions} options 
   * @returns {Promise<SearchResult<import("./course").CourseInfo>>}
   */
  listAll = async (options) => {
    return Requests.search({
      url: this.url``,
      params: options,
    });
  }
}