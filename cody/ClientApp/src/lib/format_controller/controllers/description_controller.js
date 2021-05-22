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
      return Promise.reject();
    
    if(this.wrongFormat(description))
      return Promise.resolve("descriptionError")

    return Promise.reject()
  }
}