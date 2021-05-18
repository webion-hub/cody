import { FormatControllerBase } from '../format_controller_base';

export class DescriptionController extends FormatControllerBase{
  static wrongFormat = (description) => {
    if(description.length === 0)
      return false;

    return this.wrongLength(description, 'description', true)
  }

  static check = (values, skip) => {
    const description = values.description
    
    if(this.canSkip(description, skip))
      return new Promise(resolve => resolve());

    return new Promise(resolve => {

      if(this.wrongFormat(description))
      {
        resolve("descriptionError");
      }
      else {
        resolve()
      }
    })
  }
}