import { FormatControllerBase } from '../format_controller_base';

export class CourseTitleController extends FormatControllerBase{
  static courseExist = (title, organization) => {
    return organization.isCourseDuplicate(title);
  }

  static check = (values, skip) => {
    const title = values.title
    const organization = values.organization

    if(this.canSkip(title, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {

      if(this.wrongLength(title, 'generalName')){
        resolve("courseTitleError");
        return
      }

      this
        .courseExist(title, organization)
        .then(result => {
          if(result)
            resolve("courseExist");
          else
            resolve()
        })
    })
  }
}