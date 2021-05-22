import { FormatControllerBase } from '../format_controller_base';

export class CourseTitleController extends FormatControllerBase{

  static check = async (values, skip) => {
    const title = values.title
    const organization = values.organization

    if(this.canSkip(title, skip))
      return Promise.reject();

    if(this.wrongLength(title, 'generalName'))
      return Promise.resolve("courseTitleError");


    return await this
      .valueExist({
        promise: organization.isCourseDuplicate(title),
        errorLabel: "courseExist"
      })
  }

}