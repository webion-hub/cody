import Course from './course';
import Requests from './requests';


export default class Lesson {
  static of = (course) => {
    return new Lesson(course);
  }
  
  /**
   * @param {Course} course 
   */
  constructor(course) {
    this._course = course;
  }

  withId = (lessonId) => {
    this._id = lessonId;
    this.url = Requests.createUrlTag(
      this._course.url`/lesson/${lessonId}`
    );

    return this;
  }


  getInfo = async () => {
    return Requests.get({
      url: this.url``,
    });
  }
}