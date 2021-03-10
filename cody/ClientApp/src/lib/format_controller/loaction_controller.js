export class LocationController{

  wrongFormat(location){
    return location.length > 256 || location.length === 0;
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