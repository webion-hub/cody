import { FormatControllerBase } from '../format_controller_base';

export class LocationController extends FormatControllerBase{

  static check = (values, skip) => {
    const location = values.location

    if(this.canSkip(location, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {

      if(this.wrongLength(location, 'location'))
        resolve("locationControllerError");
      else
        resolve()
    })
  }
}