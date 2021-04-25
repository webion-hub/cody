import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'
import { FormatControllerBase } from '../format_controller_base';

export class OrganizationNameController extends FormatControllerBase{
  static wrongFormat = (name) => {
    return FormatLengthController
      .set('organizationName')
      .wrongFormat(name, {skippable: false});
  }

  static check = (values, skip) => {
    const name = values.name

    if(this.canSkip(name, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {

      if(this.wrongFormat(name))
      {
        resolve("organizationNameError");
      }
      else {
        resolve()
      }
    })
  }
}