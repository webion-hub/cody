import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'

export class LocationController{

  wrongFormat(location){
    return FormatLengthController
      .set('location')
      .wrongFormat(location, {skippable: false});
  }

  checkLocation(location, skip){
    if(skip)
      return new Promise(resolve => {resolve('correctLocation')});
    return new Promise(resolve => {

      if(this.wrongFormat(location))
      {
        resolve("locationControllerError");
      }
      else {
        resolve("correctLocation")
      }
    })
  }
}