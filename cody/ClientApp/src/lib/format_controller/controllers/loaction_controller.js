import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'
import { FormatControllerBase } from '../format_controller_base';

export class LocationController extends FormatControllerBase{
  static wrongFormat = (location) => {
    return FormatLengthController
      .set('location')
      .wrongFormat(location, {skippable: false});
  }

  static check = (values, skip) => {
    const location = values.location

    if(this.canSkip(location, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {

      if(this.wrongFormat(location))
      {
        resolve("locationControllerError");
      }
      else {
        resolve()
      }
    })
  }
}