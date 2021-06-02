import { FormatControllerBase } from '../format_controller_base';

export class LocationController extends FormatControllerBase{

  static check = (values, skip) => {
    const location = values.location

    if(this.canSkip(location, skip))
      return Promise.reject();
      
    if(this.wrongLength(location, 'location'))
      return Promise.resolve("locationError");

    return Promise.reject()
  }
}