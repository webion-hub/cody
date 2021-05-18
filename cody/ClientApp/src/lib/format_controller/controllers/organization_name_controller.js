import { FormatControllerBase } from '../format_controller_base';

export class OrganizationNameController extends FormatControllerBase{

  static check = (values, skip) => {
    const name = values.name

    if(this.canSkip(name, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {

      if(this.wrongLength(name, 'generalName'))
      {
        resolve("organizationNameError");
      }
      else {
        resolve()
      }
    })
  }
}