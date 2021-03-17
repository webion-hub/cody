import { FormatLengthController } from 'src/lib/format_controller/utilities/format_length_controller'

export class OrganizationNameController{

  wrongFormat(name){
    return FormatLengthController
      .set('organizationName')
      .wrongFormat(name, {skippable: false});
  }

  checkOrganizationName(name, skip){
    if(skip)
      return new Promise(resolve => {resolve('noError')});
    return new Promise(resolve => {

      if(this.wrongFormat(name))
      {
        resolve("organizationNameError");
      }
      else {
        resolve("correctOrganizationName")
      }
    })
  }
}