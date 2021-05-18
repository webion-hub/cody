import { FormatControllerBase } from '../format_controller_base';

export class CourseTitleController extends FormatControllerBase{
  static check = (values, skip) => {
    const title = values.title

    if(this.canSkip(title, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {
      if(this.wrongLength(title, 'generalName'))
      {
        resolve("courseTitleError");
      }
      else {
        resolve()
      }
    })
  }
}