import { FormatControllerBase } from '../format_controller_base';

export class OrganizationNameController extends FormatControllerBase{

  static check = (values, skip) => {
    const name = values.name

    if(this.canSkip(name, skip))
      return Promise.reject();

    if(this.wrongLength(name, 'generalName'))
      return Promise.resolve("organizationNameError")

    return Promise.reject();
  }
}