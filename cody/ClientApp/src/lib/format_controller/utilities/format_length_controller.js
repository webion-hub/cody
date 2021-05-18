import { formatLengths } from 'src/lib/default_values/profile_constants/format_lengths'

export class FormatLengthController{
  constructor(type){
    this.settings = this.getLengths(type);
    this.max = this.settings.max;
    this.min = this.settings.min;
  }

  static set(type) {
    return new FormatLengthController(type);
  }

  getLengths(type){
    switch(type){
      case "username":
      case "generalName":
        return formatLengths.usernameLength;

      case "std":
      case "name":
      case "surname":
      case "location":
      case "website":
      case "email":
        return formatLengths.stdLength;

      case "password":
        return formatLengths.passwordLength;
      case "description":
        return formatLengths.descriptionLength;
      
      default:
        return;
    }
  }

  wrongFormat(value, {skippable}){
    const valueLength = value.length;

    if(!skippable){
      if(valueLength === 0)
        return true;
    }

    return valueLength > this.max || valueLength < this.min
  }
}