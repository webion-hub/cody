import { FormatLengthController } from 'src/lib/format_controller/format_length_controller'

export class OrganizationNameController{

  wrongFormat(name){
    return FormatLengthController
      .set('organizationName')
      .wrongFormat(name);
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