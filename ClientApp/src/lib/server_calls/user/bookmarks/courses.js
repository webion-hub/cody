import Requests from "../../requests";


export default class CourseBookmarks {
  /**
   * @param {number} courseId
   * @returns {Promise<AxiosResponse<any>>}
   */
  static add = async (courseId) => {
    return Requests.send({
      url: `user/bookmarks/courses/add/${courseId}`,
      method: 'PUT',
    });
  }
  
  /**
   * @param {number} courseId
   * @returns {Promise<AxiosResponse<any>>} 
   */
  static remove = async (courseId) => {
    return Requests.send({
      url: `user/bookmarks/courses/remove/${courseId}`,
      method: 'DELETE',
    });
  }
  
  /**
   * @param {CommonFilterOptions} options
   * @returns {Promise<SearchResult<Organization>>}
   */
  static listAll = async (options) => {
    return Requests.search({
      url: 'user/bookmarks/courses',
      method: 'GET',
      params: options,
    });
  }
}