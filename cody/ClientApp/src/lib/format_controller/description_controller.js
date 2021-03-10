export class DescriptionController{

  wrongFormat(description){
    if(description.length === 0)
      return false;

    return description.length > 512;
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