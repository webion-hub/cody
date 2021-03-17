import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'

export class DescriptionController{

  wrongFormat(description){
    if(description.length === 0)
      return false;

    return FormatLengthController
      .set('description')
      .wrongFormat(description, {skippable: true});
  }

  checkDescription(description, skip){
    if(skip)
      return new Promise(resolve => {resolve('noError')});
    return new Promise(resolve => {

      if(this.wrongFormat(description))
      {
        resolve("descriptionError");
      }
      else {
        resolve("correctDescription")
      }
    })
  }
}