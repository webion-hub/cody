import Course from "../../course";
import Requests from "../../requests"

export default class UserCourses {
  /**
   * @param {import("../../cody_types").CommonFilterOptions} options 
   * @returns {Promise<import("../../cody_types").SearchResult<Course[]>>} 
   */
  static listAll = async (options) => {
    return Requests.search({
      url: `user/courses`,
      params: options,
    });
  }
}