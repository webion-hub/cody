export class OrganizationNameController{

  wrongFormat(name){
    return name.length < 4 || name.length > 256;
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